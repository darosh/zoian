import debug from 'debug'

import type { BlockView, ConnectionView, PatchView } from '../graph/types.ts'
import type { BlockMap, GridView, PosAny, PosBlock, PosEuro, PosIo, PosKind } from './types.ts'
import { getPagesGrid } from './grid-pages.ts'
import { getEuroGrid } from './grid-euro.ts'
import { getIoGrid } from './grid-io.ts'
import type { Connection } from '../parser/types.ts'

const log = debug('zoian:grid-view')

export function gridView(view: PatchView): GridView {
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

  log('block map', blockMap)

  const connections = getConnections(view, blockMap, ['block', 'io'])
  const connectionsEuro = getConnectionsEuro(view, blockMap)

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
    patchView: view,
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
        const m = (<BlockView> c?.fromBlock)?.moduleView
        const first = m?.blockViews?.[0]
        fs = map.get(first)?.find((d) => include.includes(d.pos))
        // fs = <PosBlock>{ ...fs, blockView: <BlockView>c?.fromBlock }
        log('alternative to block', fs)
      }

      if (!ts) {
        const m = (<BlockView> c?.toBlock)?.moduleView
        const first = m?.blockViews?.[0]
        ts = map.get(first)?.find((d) => include.includes(d.pos))
        // ts = <PosBlock>{ ...ts, blockView: <BlockView>c?.toBlock }
        log('alternative to block', ts)
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

      let fs = map.get(c.fromBlock)?.find(include)
      let ts = map.get(c.toBlock)?.find(include)

      // log(fs, ts)

      if (!fs) {
        const m = (<BlockView> c?.fromBlock)?.moduleView
        const first = m?.blockViews?.[0]
        fs = map.get(first)?.find(include)
        // fs = <PosBlock>{ ...fs, blockView: <BlockView>c?.fromBlock }
        log('alternative to block', fs)
      }

      if (!ts) {
        const m = (<BlockView> c?.toBlock)?.moduleView
        const first = m?.blockViews?.[0]
        ts = map.get(first)?.find(include)
        // ts = <PosBlock>{ ...ts, blockView: <BlockView>c?.toBlock }
        log('alternative to block', ts)
      }

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

function mapConnections(blockView: BlockView, hiddenMap: BlockMap, name?: string) {
  return [
    ...blockView?.from.map((b: ConnectionView) => ({
      name,
      module: (<BlockView> b.toBlock).moduleView?.spec?.name,
      block: (<BlockView> b.toBlock).name?.replaceAll('_', ' '),
      from: true,
      strength: (<Connection> b.connection)?.strength,
      hidden: hiddenMap.has(<BlockView> b.toBlock),
    })) ?? [],
    ...blockView?.to.map((b) => ({
      name,
      module: (<BlockView> b.fromBlock).moduleView?.spec?.name,
      block: (<BlockView> b.fromBlock).name?.replaceAll('_', ' '),
      strength: (<Connection> b.connection)?.strength,
      hidden: hiddenMap.has(<BlockView> b.fromBlock),
    })) ?? [],
  ].filter((x) => x.module)
}
