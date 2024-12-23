import { JACKS_IO } from '../spec/jacks-io.ts'
import type { PosIo } from './types.ts'
import { getActive } from './active-jack.ts'
import type { PatchView } from '../graph/types.ts'

export function getIoGrid(patchView: PatchView): PosIo[] {
  return JACKS_IO.map((j, x) => {
    return {
      ...j,
      active: getActive(j, patchView.modules),
      page: -1,
      x,
      y: 0,
    }
  })
}
