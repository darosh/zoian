import { connectionView } from '../graph/patch-view.ts'
import type { BlockView, ConnectionView, IoConnection, JackView } from '../graph/types.ts'
import debug from 'debug'

const log = debug('zoian:link')

export function linkJack(connections: IoConnection[], jv: JackView, blockViews: BlockView[]) {
  const from = connections
    .filter((x) => x.source.length === 1)
    .map((c) => connectionView(c, jv, blockViews))

  from.forEach(addToModule)

  const to = connections
    .filter((x) => x.target.length === 1)
    .map((c) => connectionView(c, jv, blockViews))

  to.forEach(addToModule)

  jv.from = from
  jv.to = to
}

function addToModule(cv: ConnectionView) {
  if ((<BlockView> cv?.toBlock)?.moduleView) {
    const m = <BlockView> cv?.toBlock
    m.to.push(cv)
    log('to module', m)
  } else {
    const m = <BlockView> cv?.fromBlock
    m.from.push(cv)
    log('from module', m)
  }
}
