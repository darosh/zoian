import debug from 'debug'

import { adjustedDb, adjustedPercent, displayDb, displayPercent } from '../grid/strength.ts'
import { adjustedParam } from '../index.ts'
import { displayParam } from '../grid/param-display.ts'
import { convertDb8, convertMix, convertSeconds } from '../grid/param-convert.ts'

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
