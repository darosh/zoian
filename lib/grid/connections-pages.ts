import type { Patch } from '../parser/types.ts'
import type { ConnectionPos } from '../graph/types.ts'
import { getBlockPointPosition } from './position.ts'

export function getPagesConnections(patch: Patch): ConnectionPos[] {
  return <ConnectionPos[]> patch.connections
    .map((connection) => {
      const source = getBlockPointPosition(patch.modules, connection.source)
      const target = getBlockPointPosition(patch.modules, connection.target)

      return {
        connection,
        source,
        target,
      }
    })
    .filter((d) => d.source && d.target)
}
