import { type Jack, JackType } from '../spec/types.ts'
import type { PatchModule } from '../parser/types.ts'
import { JACKS_ZEBU } from '../spec/jacks-euro.ts'
import { ZEBU_X } from '../spec/const.ts'
import type { PosBlock, PosJack } from './types.ts'
import { getActive } from './active-jack.ts'
import { BLOCK_COLORS } from './rgb-colors.ts'

// deno-fmt-ignore
const ZEBU = [
  0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 93, JACKS_ZEBU[0], // 1
  0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 94, JACKS_ZEBU[1], // 2
  0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 95, JACKS_ZEBU[2], // 3
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 96, JACKS_ZEBU[3], // 4
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 92, JACKS_ZEBU[4], // 5
  97, 98, 88, 89, 90, 91, 99, 100, 101, 87, 0, JACKS_ZEBU[5], // 6
  0, 0, JACKS_ZEBU[6], JACKS_ZEBU[7], JACKS_ZEBU[8], JACKS_ZEBU[9], // 7 CV in
  JACKS_ZEBU[10], JACKS_ZEBU[11], JACKS_ZEBU[12], JACKS_ZEBU[13], // 7 CV out
  0, JACKS_ZEBU[14], // 7
]

export function getEuroGrid(modules: PatchModule[]): PosJack[] {
  return ZEBU.map((v, index) => {
    const x = index % ZEBU_X
    const y = (index - x) / ZEBU_X

    let o

    if (v === 0) {
      o = { type: JackType.Blank }
    } else if (v === 1) {
      o = { type: JackType.Button }
    } else if (<number> v > 1) {
      o = {
        type: JackType.Button,
        module: <PatchModule> modules.find((d) => d.id === v),
      }

      if (o.module) {
        ;(<PosBlock> <unknown> o).colors = BLOCK_COLORS[o.module.color]
      }
    } else {
      o = {
        ...<Jack> v,
        active: getActive(<Jack> v, modules),
      }
    }

    return {
      ...o,
      index,
      page: 0,
      x,
      y,
    }
  })
}
