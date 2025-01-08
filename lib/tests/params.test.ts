import debug from 'debug'

import { adjustedDb, adjustedPercent, displayDb, displayPercent } from '../grid/strength.ts'
import { adjustedParam, displayParameter } from '../index.ts'
import { displayParam } from '../grid/param-display.ts'
import { convertDb8, convertMix, convertSeconds } from '../grid/param-convert.ts'
import { assertEquals } from 'jsr:@std/assert'
import type { BlockView } from '../view/types.ts'
import { PARAM_RANGE, ParamType, TYPE_MAP, type TypeSpec, type TypesSpec } from '../grid/param-types.ts'

const log = debug('zoian:test')

Deno.test.ignore('few params', () => {
  /**
   * internal range 0 ... 65535
   *
   * 4.02 sec (4.02 ... inf)
   * -1.5 db (-8 ... +8)
   * -0.0 db (-8 ... +8)
   * 36 mix (36 ... 100)
   */

  const raw = [0, 0, 26447, 32767]

  const m = raw.map((raw) => ({
    raw,
    dB: displayDb(adjustedDb(raw)),
    '%': displayPercent(adjustedPercent(raw)),
    param: displayParam(adjustedParam(raw)),
    paramDb: convertDb8(raw),
    paramMix: convertMix(raw),
    paramSeconds: convertSeconds(raw),
  }))

  log('%O', m)
})

Deno.test.ignore('params update', async () => {
  const tab = await Deno.readTextFile('./tests/fixtures/params.tab')
  const lines = tab.split('\n').slice(1)
  const updated = []

  for (const line of lines) {
    if (!line.trim()) {
      updated.push(line)
      continue
    }

    if (line.startsWith('//')) {
      updated.push(line)
      continue
    }

    const cols = line.split('\t')

    if (cols[1]) {
      updated.push(line)
      continue
    }

    const pt = <ParamType> <unknown> ParamType[<ParamType> <unknown> cols[0]]

    let module
    let block
    let option
    let value

    for (const [key, values] of Object.entries(TYPE_MAP)) {
      for (const ts of values) {
        if (((<TypeSpec> ts)?.type === pt)) {
          module = ts.modules[0]
          block = key
          break
        }

        const f = (<TypesSpec> ts)?.types?.find((t) => t[0] === pt)

        if (f) {
          module = ts.modules[0]
          block = key
          option = f[1]
          value = f[2]

          break
        }
      }

      if (module) {
        break
      }
    }

    log(pt, module, block, option, value)

    const pr = Array.isArray(PARAM_RANGE[pt][0]) ? PARAM_RANGE[pt][0] : PARAM_RANGE[pt]
    const u = pr[2] ? ` ${pr[2]}` : ''
    updated.push([cols[0], 0, pr[0] + u, module, block, '', ''].join('\t'))
    updated.push([cols[0], 65535, pr[1] + u, module, block, '', ''].join('\t'))
  }

  await Deno.writeTextFile('./tests/fixtures/params-updated.tab', updated.join('\n'))
})

Deno.test('params', async () => {
  const tab = await Deno.readTextFile('./tests/fixtures/params.tsv')

  const lines = tab.split('\n').slice(1)

  for (const line of lines) {
    if (!line.trim()) {
      continue
    }

    if (line.startsWith('//')) {
      continue
    }

    const cols = line.split('\t')

    if (!cols[1]) {
      continue
    }

    const type = cols[0]
    const name = cols[4]
    const module = cols[3]
    const raw = parseInt(cols[1], 10)
    const expected = cols[2]
    const option = (cols[5] ?? '').split(':').map((x) => x.trim())
    const bv = {
      name,
      moduleView: {
        spec: {
          name: module,
        },
        module: {
          options: {
            [option[0]]: option[1],
          },
        },
      },
    }

    const display = displayParameter(<BlockView> bv, raw).toString()

    log({ type, name, raw, expected, display })

    try {
      assertEquals(
        display
          .replace('\u202F', ' ')
          .replace('−', '-')
          .split(',').shift(),
        expected,
      )
    } catch (error: unknown) {
      if (cols[7] === 'approx') {
        log('approx value')
      }

      log((<Error> error)?.message?.split('\n').filter(Boolean).join('\n'))

      if (cols[7] !== 'approx') {
        break
      }
    }
  }
})
