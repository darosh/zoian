import { graphIoConnections } from '../graph/graph-connections-io.ts'
import { JACKS_EURO } from '../spec/jacks-euro.ts'
import type { ConnectionPos, PatchView } from '../graph/types.ts'
import type { PosJack } from './types.ts'
import { getEuroOrModulePointPosition } from './position.ts'

export function getEuroConnections(view: PatchView, euroGrid: PosJack[]): ConnectionPos[] {
  return <ConnectionPos[]> graphIoConnections(JACKS_EURO, view.modules)
    .map((connection) => {
      const source = getEuroOrModulePointPosition(view.modules, euroGrid, connection.source)
      const target = getEuroOrModulePointPosition(view.modules, euroGrid, connection.target)

      return {
        connection,
        source,
        target,
      }
    })
}
