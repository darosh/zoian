import debug from 'debug'

import type { Patch } from '../parser/types.ts'
import type { BlockView, ConnectionView, IoConnection, JackView, ModuleView, PatchView } from './types.ts'
import { MODULES } from '../spec/modules.ts'
import { blockEntries } from '../parser/utils/block-entries.ts'
import { getCpuTable } from './table-cpu.ts'
import { getStarredTable } from './table-starred.ts'
import { JACKS_IO } from '../spec/jacks-io.ts'
import { graphJackConnections } from './graph-connections-io.ts'
import { linkJack } from '../grid/link-jack.ts'
import { getMidiTable } from './table-midi.ts'

const log = debug('zoian:view')

export function patchView(patch: Patch): PatchView {
  const blockViews: BlockView[] = []

  const moduleViews: ModuleView[] = patch.modules.map((module) => {
    const moduleView: Record<string, unknown> = {
      module,
      spec: MODULES[module.id],
      from: <ConnectionView[]> [],
      to: <ConnectionView[]> [],
      blockViews: <BlockView[]> [],
    }

    moduleView.blockViews = blockEntries(module.blocks)
      .map(([name, block], index) => {
        return <BlockView> {
          name,
          index,
          block,
          moduleView: <ModuleView> <unknown> moduleView,
          from: <ConnectionView[]> [],
          to: <ConnectionView[]> [],
        }
      })

    blockViews.push(...<BlockView[]> moduleView.blockViews)

    return <ModuleView> <unknown> moduleView
  })

  const ioJackViews = getJackViews(moduleViews, blockViews)

  const { connections, orphanConnections } = interConnect(patch, moduleViews)

  for (const jv of ioJackViews) {
    connections.push(...jv.from)
    connections.push(...jv.to)
  }

  return {
    patch,
    moduleViews,
    blockViews,
    ioJackViews,
    connections,
    orphanConnections,
    midiTable: getMidiTable(patch),
    cpuTable: getCpuTable(patch),
    starredTable: getStarredTable(patch),
  }
}

function interConnect(patch: Patch, moduleViews: ModuleView[]) {
  const connections: ConnectionView[] = []
  const orphanConnections: ConnectionView[] = []

  for (const connection of patch.connections) {
    const fromModule = moduleViews[connection.source[0]]
    const fromPos = connection.source[1]

    if (!fromModule) {
      log('not found module', connection.source[0])
    }

    const fromBlock = fromModule.blockViews.find((b) => b.block.position === fromPos)
    const toModule = moduleViews[connection.target[0]]
    const toPos = connection.target[1]
    const toBlock = toModule.blockViews.find((b) => b.block.position === toPos)

    const cv: ConnectionView = {
      connection,
      fromBlock,
      toBlock,
    }

    if (fromBlock) {
      fromBlock.from.push(cv)
    }

    if (toBlock) {
      toBlock.to.push(cv)
    }

    connections.push(cv)

    if (!cv.fromBlock || !cv.toBlock) {
      orphanConnections.push(cv)
    }
  }

  return { connections, orphanConnections }
}

export function connectionView(connection: IoConnection, jackView: JackView, blockViews: BlockView[]): ConnectionView {
  if (connection.source.length === 1) {
    const moduleId = <number> connection.target[0]
    const blockId = <number> connection.target[1]
    const toBlock = blockViews.find((b) => b.moduleView.module.number === moduleId && b.block.position === blockId)

    if (!toBlock) {
      log('block views', blockViews.length)
      log('block not found', moduleId, blockId)
      throw ('block not found')
    }

    return {
      connection,
      fromBlock: jackView,
      toBlock,
    }
  } else {
    const moduleId = <number> connection.source[0]
    const blockId = <number> connection.source[1]
    const fromBlock = blockViews.find((b) => b.moduleView.module.number === moduleId && b.block.position === blockId)

    if (!fromBlock) {
      log('block not found', moduleId, blockId)
    }

    return {
      connection,
      fromBlock,
      toBlock: jackView,
    }
  }
}

function getJackViews(moduleViews: ModuleView[], blockViews: BlockView[]) {
  const jackViews: JackView[] = []

  for (const j of JACKS_IO) {
    const connections = graphJackConnections(j, moduleViews)

    const jv: JackView = {
      jack: {
        id: j.id,
        io: true,
        active: connections.length > 0,
      },
      spec: j,
      from: [],
      to: [],
    }

    linkJack(connections, jv, blockViews)

    jackViews.push(jv)
  }

  return jackViews
}
