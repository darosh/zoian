import type { Patch } from '../parser/types.ts'
import { graphIoConnections } from '../graph/graph-connections-io.ts'
import { JACKS_EURO } from '../spec/jacks-euro.ts'
import type { ConnectionPos } from '../graph/types.ts'
import type { PosJack } from './types.ts'
import { getEuroOrModulePointPosition } from './position.ts'

export function getEuroConnections(patch: Patch, euroGrid: PosJack[]): ConnectionPos[] {
  return <ConnectionPos[]> graphIoConnections(JACKS_EURO, patch.modules)
    .map((connection) => {
      const source = getEuroOrModulePointPosition(patch.modules, euroGrid, connection.source)
      const target = getEuroOrModulePointPosition(patch.modules, euroGrid, connection.target)

      return {
        connection,
        source,
        target,
      }
    })
}
