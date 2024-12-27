import debug from 'debug'

import type { BlockView, PatchView } from '../view/types.ts'
import type { BlockMap, PosAny, PosBlock, PosEuro, PosIo } from './types.ts'

const log = debug('zoian:grid-connections-euro')

export function getConnectionsEuro(view: PatchView, map: BlockMap, hidden: BlockMap): [PosAny, PosAny][] {
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

        if (hidden.has(c?.fromBlock)) {
          log('alternative to hidden block', c?.fromBlock, fs)
        } else {
          log('alternative to UNKNOWN block', c?.fromBlock, fs)
        }
      }

      if (!ts) {
        const m = (<BlockView> c?.toBlock)?.moduleView
        const first = m?.blockViews?.[0]
        ts = map.get(first)?.find(include)
        // ts = <PosBlock>{ ...ts, blockView: <BlockView>c?.toBlock }

        if (hidden.has(c?.toBlock)) {
          log('alternative to hidden block', c?.toBlock, ts)
        } else {
          log('alternative to UNKNOWN block', c?.toBlock, ts)
        }
      }

      if (!fs || !ts) {
        log('MISSING connection!')
        return
      }

      return [
        <(PosBlock | PosEuro | PosIo)> fs,
        <(PosBlock | PosEuro | PosIo)> ts,
      ]
    })
    .filter((x) => x)
}
