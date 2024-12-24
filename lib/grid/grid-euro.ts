import { type Jack, JackType } from '../spec/types.ts'
import { JACKS_EURO } from '../spec/jacks-euro.ts'
import { EURO_X } from '../spec/const.ts'
import type { PosJack } from './types.ts'
import { getActive } from './active-jack.ts'
import { BLOCK_COLORS } from './rgb-colors.ts'
import type { BlockView, ModuleView, PatchView } from '../graph/types.ts'

// deno-fmt-ignore
const EURO = [
  0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 93, JACKS_EURO[0], // 1
  0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 94, JACKS_EURO[1], // 2
  0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 95, JACKS_EURO[2], // 3
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 96, JACKS_EURO[3], // 4
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 92, JACKS_EURO[4], // 5
  97, 98, 88, 89, 90, 91, 99, 100, 101, 87, 0, JACKS_EURO[5], // 6
  0, 0, JACKS_EURO[6], JACKS_EURO[7], JACKS_EURO[8], JACKS_EURO[9], // 7 CV in
  JACKS_EURO[10], JACKS_EURO[11], JACKS_EURO[12], JACKS_EURO[13], // 7 CV out
  0, JACKS_EURO[14], // 7
]

export function getEuroGrid(view: PatchView): PosJack[] {
  return EURO.map((v, index) => {
    const x = index % EURO_X
    const y = (index - x) / EURO_X

    let o

    if (v === 0) {
      o = { type: JackType.Blank }
    } else if (v === 1) {
      o = { type: JackType.Button }
    } else if (<number> v > 1) {
      const moduleView = <ModuleView> view.modules.find((d) => d.module.id === v)

      o = {
        type: JackType.Button,
        module: moduleView?.module,
        blockView: moduleView?.blocks?.[0],
        colors: moduleView?.module?.color ? BLOCK_COLORS[moduleView?.module?.color] : undefined,
      }
    } else {
      o = {
        ...<Jack> v,
        active: getActive(<Jack> v, view.modules),
        blockView: <BlockView> <never> {
          from: [],
          to: [],
        },
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
