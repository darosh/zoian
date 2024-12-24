import type { ConnectionPos, PatchView } from '../graph/types.ts'
import { graphIoConnections } from '../graph/graph-connections-io.ts'
import { JACKS_IO } from '../spec/jacks-io.ts'
import { getIoOrModulePointPosition } from './position.ts'

export function getIoConnections(view: PatchView): ConnectionPos[] {
  return <ConnectionPos[]> graphIoConnections(JACKS_IO, view.modules)
    .map((connection) => {
      const source = getIoOrModulePointPosition(view.modules, connection.source)
      const target = getIoOrModulePointPosition(view.modules, connection.target)

      return {
        connection,
        source,
        target,
      }
    })
}
