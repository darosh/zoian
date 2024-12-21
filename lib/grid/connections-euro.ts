import type { Patch } from '../parser/types.ts'
import { graphIoConnections } from '../graph/graph-connections-io.ts'
import { JACKS_ZEBU } from '../spec/jacks-euro.ts'
import type { ConnectionPos } from '../graph/types.ts'
import type { PosJack } from './types.ts'
import { getEuroOrModulePointPosition } from './position.ts'

export function getEuroConnections(patch: Patch, zebuGrid: PosJack[]): ConnectionPos[] {
  return <ConnectionPos[]> graphIoConnections(JACKS_ZEBU, patch.modules)
    .map((connection) => {
      const source = getEuroOrModulePointPosition(patch.modules, zebuGrid, connection.source)
      const target = getEuroOrModulePointPosition(patch.modules, zebuGrid, connection.target)

      return {
        connection,
        source,
        target,
      }
    })
}
