import type { PosIo } from './types.ts'
import type { JackView, PatchView } from '../graph/types.ts'

export function getIoGrid(patchView: PatchView): PosIo[] {
  return patchView.ioJackViews.map((jackView: JackView, x) => {
    return {
      pos: 'io',
      page: -1,
      x,
      y: 0,
      index: x,
      jackView,
    }
  })
}
