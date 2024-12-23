import type { PatchView } from '../graph/types.ts'
import type { GridView } from './types.ts'
import { getPagesGrid } from './grid-pages.ts'
import { getEuroGrid } from './grid-euro.ts'
import { getIoGrid } from './grid-io.ts'
import { getPagesConnections } from './connections-pages.ts'
import { getEuroConnections } from './connections-euro.ts'
import { getIoConnections } from './connections.-io.ts'

export function gridView(patchView: PatchView): GridView {
  const pagesGrid = getPagesGrid(patchView.patch)
  const euroGrid = getEuroGrid(patchView.patch.modules)
  const ioGrid = getIoGrid(patchView.patch.modules)

  const pagesConnections = getPagesConnections(patchView.patch)
  const euroConnections = getEuroConnections(patchView.patch, euroGrid)
  const ioConnections = getIoConnections(patchView.patch)

  return {
    patchView,
    pagesGrid,
    euroGrid,
    ioGrid,
    pagesConnections,
    euroConnections,
    ioConnections,
  }
}
