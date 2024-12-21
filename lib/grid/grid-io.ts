import type { PatchModule } from '../parser/types.ts'
import { JACKS_IO } from '../spec/jacks-io.ts'
import type { PosIo } from './types.ts'
import { getActive } from './active-jack.ts'

export function getIoGrid(modules: PatchModule[]): PosIo[] {
  return JACKS_IO.map((j, x) => {
    return {
      ...j,
      active: getActive(j, modules),
      page: -1,
      x,
      y: 0,
    }
  })
}
