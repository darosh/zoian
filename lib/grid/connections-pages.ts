import debug from 'debug'

import type { BlockView, PatchView } from '../view/types.ts'
import type { BlockMap, PosAny, PosBlock, PosEuro, PosIo, PosKind } from './types.ts'

const log = debug('zoian:grid-connections-pages')

export function getConnections(view: PatchView, map: BlockMap, hidden: BlockMap, include: PosKind[]): [PosAny, PosAny][] {
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

        if (hidden.has(c?.fromBlock)) {
          log('alternative to hidden block', c?.fromBlock, fs)
        } else {
          log('alternative to UNKNOWN block', c?.fromBlock, fs)
        }
      }

      if (!ts) {
        const m = (<BlockView> c?.toBlock)?.moduleView
        const first = m?.blockViews?.[0]
        ts = map.get(first)?.find((d) => include.includes(d.pos))
        // ts = <PosBlock>{ ...ts, blockView: <BlockView>c?.toBlock }

        if (hidden.has(c?.toBlock)) {
          log('alternative to hidden block', c?.toBlock, fs)
        } else {
          log('alternative to UNKNOWN block', c?.toBlock, fs)
        }
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
