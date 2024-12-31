import debug from 'npm:debug'
import { parse } from '../../parser/parse.ts'
import stringify from 'npm:json-stringify-pretty-compact@4.0.0'
import { getGrid } from '../../grid/grid.ts'
import { getView } from '../../view/patch-view.ts'
import type { Patch } from '../../parser/types.ts'

const log = debug('zoian:test')

async function readDir(src: string, list: { f: Deno.DirEntry; s: string }[] = []) {
  const dir = Deno.readDir(src)

  for await (const f of dir) {
    if (f.isFile && f.name.endsWith('.bin')) {
      list.push({ f, s: src })
    } else if (f.isDirectory) {
      await readDir(`${src}/${f.name}`, list)
    }
  }

  return list
}

export async function convertDir(src: string, tgt?: string, index = false, binary: boolean = false) {
  const r: { parsed: Patch; data: Uint8Array; name: string }[] = []

  if (tgt) {
    await Deno.mkdir(tgt, { recursive: true })
  }

  const versions: Record<string, Record<string, { count: number; file: string | null }>> = {}
  const indexLines = []
  const list = await readDir(src)

  list.sort((a, b) => a.f.name.localeCompare(b.f.name))

  const failed = []

  for await (const { f, s } of list) {
    log('reading %s', f.name)

    const p = `${s}/${f.name}`
    const data = await Deno.readFile(p)
    let parsed

    try {
      performance.mark('ParseStart')
      parsed = parse(data, binary)
      performance.mark('ParseEnd')
      const pA = performance.measure('ParseStart->ParseEnd', 'ParseStart', 'ParseEnd')

      parsed.modules.forEach((m) => {
        versions[m.type] = versions[m.type] || {}
        versions[m.type][m.version] = versions[m.type][m.version] || { count: 0, file: null }
        versions[m.type][m.version].count++
        versions[m.type][m.version].file = f.name
      })

      performance.mark('ViewStart')
      const view = getView(parsed)
      performance.mark('ViewEnd')
      const grid = getGrid(view)
      performance.mark('GridEnd')

      const pB = performance.measure('ViewStart->ViewEnd', 'ViewStart', 'ViewEnd')
      const pC = performance.measure('ViewEnd->GridEnd', 'ViewEnd', 'GridEnd')

      log('parse/view/grid/sum duration', pA.duration.toFixed(2), pB.duration.toFixed(2), pC.duration.toFixed(2), (pA.duration + pB.duration + pC.duration).toFixed(2))

      if (grid.view.connectionTable.counts.unknown) {
        log('unknown', grid.view.connectionTable.counts.unknown)
      }

      if (grid.view.connectionTable.counts.mixed) {
        log('mixed', grid.view.connectionTable.counts.mixed)
      }

      if (grid.view.connectionTable.counts.missing) {
        log('missing', grid.view.connectionTable.counts.missing)
      }
    } catch {
      log('FAILED', f.name)
      failed.push(p)
      continue
    }

    const n = `${tgt}/${f.name}.json`

    if (tgt) {
      log('writing %s', n)
      await Deno.writeTextFile(n, stringify(parsed, { maxLength: 640 }))

      indexLines.push(`import patch_${indexLines.length} from './${f.name}.json' with { type: 'json' }`)
    }

    r.push({ parsed, data, name: n })
  }

  if (tgt && index) {
    indexLines.push(`export const patches: any[] = [${indexLines.map((_l, i) => `patch_${i}`)}]`)
    const m = `${tgt}/patches.ts`
    log('writing %s', m)
    await Deno.writeTextFile(m, indexLines.join('\n'))
  }

  log('Failed %O', failed)
  log(
    'Versions %O',
    Object.entries(versions)
      .filter(([, v]) => Object.keys(v).length > 1),
  )

  return r
}
