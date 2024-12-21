import type { Patch } from '../parser/types.ts'
import type { ConnectionPos } from '../graph/types.ts'
import { graphIoConnections } from '../graph/graph-connections-io.ts'
import { JACKS_IO } from '../spec/jacks-io.ts'
import { getIoOrModulePointPosition } from './position.ts'

export function getIoConnections(patch: Patch): ConnectionPos[] {
  return <ConnectionPos[]> graphIoConnections(JACKS_IO, patch.modules)
    .map((connection) => {
      const source = getIoOrModulePointPosition(patch.modules, connection.source)
      const target = getIoOrModulePointPosition(patch.modules, connection.target)

      return {
        connection,
        source,
        target,
      }
    })
}
