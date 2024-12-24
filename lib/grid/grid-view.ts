import debug from 'debug'

import type { PatchView } from '../graph/types.ts'
import type { GridView } from './types.ts'
import { getPagesGrid } from './grid-pages.ts'
import { getEuroGrid } from './grid-euro.ts'
import { getIoGrid } from './grid-io.ts'
import { getPagesConnections } from './connections-pages.ts'
import { getEuroConnections } from './connections-euro.ts'
import { getIoConnections } from './connections.io.ts'

const log = debug('zoian:grid:view')

export function gridView(view: PatchView): GridView {
  log('gridView()')

  const pagesGrid = getPagesGrid(view)
  const euroGrid = getEuroGrid(view)
  const ioGrid = getIoGrid(view)

  const pagesConnections = getPagesConnections(view.patch)
  const euroConnections = getEuroConnections(view, euroGrid)
  const ioConnections = getIoConnections(view)

  const blockMap = new Map()

  for (const pos of pagesGrid) {
    if (pos?.blockView) {
      blockMap.set(pos?.blockView, pos)
    }
  }

  for (const pos of euroGrid) {
    if (pos?.blockView) {
      blockMap.set(pos?.blockView, pos)
    }
  }

  for (const pos of ioGrid) {
    if (pos?.blockView) {
      blockMap.set(pos?.blockView, pos)
    }
  }

  return {
    patchView: view,
    pagesGrid,
    euroGrid,
    ioGrid,
    pagesConnections,
    euroConnections,
    ioConnections,
    blockMap,
  }
}
