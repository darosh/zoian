import type { Patch } from '../parser/types.ts'
import type { ConnectionView, ModuleView, PatchView } from './types.ts'
import { MODULES } from '../spec/modules.ts'
import { blockEntries } from '../parser/utils/block-entries.ts'
import { getCpuTable } from './cpu-table.ts'
import { getStarredTable } from './table-starred.ts'

export function patchView(patch: Patch): PatchView {
  const connections: ConnectionView[] = []
  const orphanConnections: ConnectionView[] = []

  const modules: ModuleView[] = patch.modules.map((module) => {
    return {
      module,
      spec: MODULES[module.id],
      from: <ConnectionView[]> [],
      to: <ConnectionView[]> [],
      blocks: blockEntries(module.blocks).map(([name, block], index) => {
        return {
          name,
          index,
          block,
          from: [],
          to: [],
        }
      }),
    }
  })

  for (const connection of patch.connections) {
    const fromModule = modules[connection.source[0]]
    const fromPos = connection.source[1]
    const fromBlock = fromModule.blocks.find((b) => b.block.position === fromPos)

    const toModule = modules[connection.target[0]]
    const toPos = connection.target[1]
    const toBlock = toModule.blocks.find((b) => b.block.position === toPos)

    const cv: ConnectionView = { connection, fromModule, fromBlock, toModule, toBlock }

    if (fromBlock) {
      fromBlock.from.push(cv)
    }

    fromModule.from.push(cv)

    if (toBlock) {
      toBlock.to.push(cv)
    }

    toModule.to.push(cv)

    connections.push(cv)

    if (!cv.fromBlock || !cv.toBlock) {
      orphanConnections.push(cv)
    }
  }
  return {
    patch,
    modules,
    connections,
    orphanConnections,
    cpuTable: getCpuTable(patch),
    starredTable: getStarredTable(patch),
  }
}
