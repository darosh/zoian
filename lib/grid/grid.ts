import debug from 'debug'

import type { BlockView, ConnectionView, PatchView } from '../view/types.ts'
import type { BlockMap, Grid, PosBlock, PosEuro, PosIo } from './types.ts'
import type { Connection } from '../parser/types.ts'
import { getPagesGrid } from './grid-pages.ts'
import { getEuroGrid } from './grid-euro.ts'
import { getIoGrid } from './grid-io.ts'
import { getConnections } from './connections-pages.ts'
import { getConnectionsEuro } from './connections-euro.ts'
import { adjustedDb, adjustedPercent, displayDb, displayPercent } from './strength.ts'

const log = debug('zoian:grid')

export function getGrid(view: PatchView): Grid {
  const [pagesGrid, hiddenGrid] = getPagesGrid(view)
  const euroGrid = getEuroGrid(view)
  const ioGrid = getIoGrid(view)
  const blockMap: BlockMap = new Map()
  const hiddenMap: BlockMap = new Map()

  mapPos(blockMap, pagesGrid)
  // mapPos(blockMap, hiddenGrid)
  mapPos(hiddenMap, hiddenGrid)
  mapPos(blockMap, euroGrid)
  mapPos(blockMap, ioGrid)

  log('block map', blockMap.size)

  const connections = getConnections(view, blockMap, hiddenMap, ['block', 'io'])
  const connectionsEuro = view.patch.euro ? getConnectionsEuro(view, blockMap, hiddenMap) : []

  function getConnected(pos: PosBlock) {
    const current = mapConnections(pos.blockView, hiddenMap)

    if (pos.first) {
      const hiddenBlocks = <BlockView[]> pos.moduleView.blockViews
        .map((bv) => hiddenMap.has(bv) ? bv : false)
        .filter(Boolean)

      const hidden = []

      for (const hb of hiddenBlocks) {
        const name = hb.name.replaceAll('_', ' ')
        hidden.push(...mapConnections(hb, hiddenMap, name))
      }

      return {
        current,
        hidden: hidden.length ? hidden : undefined,
      }
    }

    return {
      current,
    }
  }

  return {
    view,
    pagesGrid,
    hiddenGrid,
    euroGrid,
    ioGrid,
    connections,
    connectionsEuro,
    blockMap,
    getConnected,
  }
}

function mapPos(blockMap: BlockMap, grid: (PosBlock | undefined | PosEuro | PosIo)[]) {
  for (const pos of grid) {
    if (!pos) {
      continue
    }

    const key = (<PosBlock> pos).blockView || (<PosIo> pos).jackView

    if (!key) {
      continue
    }

    if (blockMap.has(key)) {
      ;(<(PosBlock | PosEuro | PosIo)[]> blockMap.get(key)).push(pos)
    } else {
      blockMap.set(key, [pos])
    }
  }
}

function mapConnections(blockView: BlockView, hiddenMap: BlockMap, name?: string) {
  return [
    ...blockView?.from.map((b: ConnectionView) => ({
      name,
      module: (<BlockView> b.toBlock).moduleView?.spec?.name,
      block: (<BlockView> b.toBlock).name?.replaceAll('_', ' '),
      from: true,
      strength: (<Connection> b.connection)?.strength,
      db: displayDb(adjustedDb((<Connection> b.connection)?.strength)),
      percent: displayPercent(adjustedPercent((<Connection> b.connection)?.strength)),
      hidden: hiddenMap.has(<BlockView> b.toBlock),
    })) ?? [],
    ...blockView?.to.map((b) => ({
      name,
      module: (<BlockView> b.fromBlock).moduleView?.spec?.name,
      block: (<BlockView> b.fromBlock).name?.replaceAll('_', ' '),
      strength: (<Connection> b.connection)?.strength,
      db: displayDb(adjustedDb((<Connection> b.connection)?.strength)),
      percent: displayPercent(adjustedPercent((<Connection> b.connection)?.strength)),
      hidden: hiddenMap.has(<BlockView> b.fromBlock),
    })) ?? [],
  ].filter((x) => x.module)
}
