import type { Patch } from '../parser/types.ts'
import type { BlockView, ConnectionView, JackView, ModuleView, PatchView } from './types.ts'
import { MODULES } from '../spec/modules.ts'
import { blockEntries } from '../parser/utils/block-entries.ts'
import { getCpuTable } from './cpu-table.ts'
import { getStarredTable } from './table-starred.ts'

export function patchView(patch: Patch): PatchView {
  const connections: ConnectionView[] = []
  const orphanConnections: ConnectionView[] = []

  const modules: ModuleView[] = patch.modules.map((module) => {
    const moduleView: Record<string, unknown> = {
      module,
      spec: MODULES[module.id],
      from: <ConnectionView[]> [],
      to: <ConnectionView[]> [],
      blocks: <BlockView[]> [],
    }

    moduleView.blocks = blockEntries(module.blocks)
      .map(([name, block], index) => {
        return {
          module,
          name,
          index,
          moduleView,
          block,
          from: [],
          to: [],
        }
      })

    return <ModuleView> <unknown> moduleView
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

  const ios: JackView[] = []

  // for (const j of JACKS_IO) {
  //   const cons = getJackConnections(j, modules)
  //
  //   const jv: JackView = {
  //     spec: j,
  //   }
  //
  //   ios.push(jv)
  // }

  return {
    patch,
    modules,
    ios,
    connections,
    orphanConnections,
    cpuTable: getCpuTable(patch),
    starredTable: getStarredTable(patch),
  }
}
