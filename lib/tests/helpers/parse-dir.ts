import debug from 'npm:debug'
import { parse } from '../../parser/parse.ts'
import stringify from 'npm:json-stringify-pretty-compact@4.0.0'

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

export async function convertDir(src: string, tgt?: string, index = false) {
  if (tgt) {
    await Deno.mkdir(tgt, { recursive: true })
  }

  const versions: Record<string, Record<string, number>> = {}
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
      parsed = parse(data)

      parsed.modules.forEach((m) => {
        versions[m.type] = versions[m.type] || {}
        versions[m.type][m.version] = versions[m.type][m.version] || 0
        versions[m.type][m.version]++
      })
    } catch {
      log('FAILED', f.name)
      failed.push(p)
      continue
    }

    if (tgt) {
      const n = `${tgt}/${f.name}.json`

      log('writing %s', n)
      await Deno.writeTextFile(n, stringify(parsed, { maxLength: 640 }))

      indexLines.push(`import patch_${indexLines.length} from './${f.name}.json' with { type: 'json' }`)
    }
  }

  if (tgt && index) {
    indexLines.push(`export const patches: any[] = [${indexLines.map((_l, i) => `patch_${i}`)}]`)
    const m = `${tgt}/patches.ts`
    log('writing %s', m)
    await Deno.writeTextFile(m, indexLines.join('\n'))
  }

  log('Failed %O', failed)
  log('Versions %O', Object.entries(versions).filter(([, v]) => Object.keys(v).length > 1))
}
