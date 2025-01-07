import debug from 'debug'

import { adjustedDb, adjustedPercent, displayDb, displayPercent } from '../grid/strength.ts'
import { adjustedParam, displayParameter } from '../index.ts'
import { displayParam } from '../grid/param-display.ts'
import { convertDb8, convertMix, convertSeconds } from '../grid/param-convert.ts'
import { assertEquals } from 'jsr:@std/assert'
import type { BlockView } from '../view/types.ts'

const log = debug('zoian:test')

Deno.test.ignore('params', () => {
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

Deno.test('params', async () => {
  const tab = await Deno.readTextFile('./tests/fixtures/params.tab')

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
    const option = cols[5]?.split(':').map((x) => x.trim())
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

    const display = displayParameter(<BlockView> bv, raw)
      .toString()

    log({ type, name, raw, expected, display })

    try {
      assertEquals(
        display
          .replace('\u202F', ' ')
          .replace('−', '-'),
        expected,
      )
    } catch (error) {
      log(error)
    }
  }
})
