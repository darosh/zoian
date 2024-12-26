import debug from 'debug'

import type { BlockView, ModuleView, PatchView } from '../graph/types.ts'
import type { BlockMap, GridView, PosAny, PosBlock, PosEuro, PosIo, PosKind } from './types.ts'
import { getPagesGrid } from './grid-pages.ts'
import { getEuroGrid } from './grid-euro.ts'
import { getIoGrid } from './grid-io.ts'

const log = debug('zoian:grid-view')

export function gridView(view: PatchView): GridView {
  const [pagesGrid, hiddenGrid] = getPagesGrid(view)
  const euroGrid = getEuroGrid(view)
  const ioGrid = getIoGrid(view)
  const blockMap: BlockMap = new Map()
  // const hiddenMap: BlockMap = new Map()

  mapPos(blockMap, pagesGrid)
  // mapPos(blockMap, hiddenGrid)
  // mapPos(hiddenMap, hiddenGrid)
  mapPos(blockMap, euroGrid)
  mapPos(blockMap, ioGrid)

  log('block map', blockMap)

  const connections = getConnections(view, blockMap, ['block', 'io'])
  const connectionsEuro = getConnectionsEuro(view, blockMap)

  return {
    patchView: view,
    pagesGrid,
    hiddenGrid,
    euroGrid,
    ioGrid,
    connections,
    connectionsEuro,
    blockMap,
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

function getConnections(view: PatchView, map: BlockMap, include: PosKind[]): [PosAny, PosAny][] {
  return <[PosAny, PosAny][]> view.connections
    .map((c) => {
      if (!c.fromBlock || !c.toBlock) {
        log('missing blocks', c)

        return
      }

      let fs = map.get(c.fromBlock)?.find((d) => include.includes(d.pos))
      let ts = map.get(c.toBlock)?.find((d) => include.includes(d.pos))

      // log(fs, ts)

      if (!fs) {
        const m = (<BlockView>c?.fromBlock)?.moduleView
        const first = m?.blockViews?.[0]
        log('alternative from block', first)
        fs = map.get(first)?.find((d) => include.includes(d.pos))
      }

      if (!ts) {
        const m = (<BlockView>c?.toBlock)?.moduleView
        const first = m?.blockViews?.[0]
        log('alternative to block', first)
        ts = map.get(first)?.find((d) => include.includes(d.pos))
      }

      if (!fs || !ts) {
        log('skipping connection')
        return
      }

      return [
        <(PosBlock | PosEuro | PosIo)> fs,
        <(PosBlock | PosEuro | PosIo)> ts,
      ]
    })
    .filter((x) => x)
}

function getConnectionsEuro(view: PatchView, map: BlockMap): [PosAny, PosAny][] {
  const include = (pos: PosAny) => {
    if (pos.pos !== 'block') {
      return true
    }

    return pos.page > 0
  }

  return <[PosAny, PosAny][]> view.connections
    .map((c) => {
      if (!c.fromBlock || !c.toBlock) {
        log('missing blocks', c)

        return
      }

      const fs = map.get(c.fromBlock)?.find(include)
      const ts = map.get(c.toBlock)?.find(include)

      // log(fs, ts)

      if (!fs || !ts) {
        return
      }

      return [
        <(PosBlock | PosEuro | PosIo)> fs,
        <(PosBlock | PosEuro | PosIo)> ts,
      ]
    })
    .filter((x) => x)
}
