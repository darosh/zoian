import debug from 'debug'

import type { BlockPoint, PatchModule } from '../parser/types.ts'
import type { PosJack, PosGrid } from './types.ts'
import { blockEntries } from '../parser/utils/block-entries.ts'
import { GX } from '../spec/const.ts'
import type { JackPoint, ModulePoint } from '../graph/types.ts'
import { JACKS_IO } from '../spec/jacks-io.ts'

const log = debug('zoian:grid')

export function getBlockPointPosition(modules: PatchModule[], [moduleIndex, block]: BlockPoint): PosGrid | null {
  const module = modules[moduleIndex]
  const blocks = blockEntries(module.blocks)
  const blockIndex = blocks.findIndex((b) => b[1].position === block)

  if (blockIndex === -1) {
    log('missing block %s in module %s', block, module.type)

    return null
  }

  const page = module.page
  const startPosition = module.position[0]
  const position = startPosition + blockIndex
  const x = position % GX
  const y = (position - x) / GX

  return { page, x, y, module, blockName: blocks[blockIndex][0] }
}

export function getIoOrModulePointPosition(modules: PatchModule[], point: ModulePoint | JackPoint): PosGrid {
  if (point.length === 1) {
    const x = JACKS_IO.findIndex((x) => x.id === point[0])

    return {
      page: -1,
      x,
      y: 0,
      module: modules[0],
      blockName: '???',
      io: true
    }
  }

  return getPointPosition(modules, point)
}

export function getEuroOrModulePointPosition(modules: PatchModule[], zebuGrid: PosJack[], point: ModulePoint | JackPoint): PosGrid {
  if (point.length === 1) {
    const bj = <PosJack> zebuGrid.find((x) => x?.id === point[0])

    return {
      page: -1,
      x: bj.x,
      y: bj.y,
      id: bj?.id,
      blockName: <string> bj?.id,
    }
  }

  return getPointPosition(modules, point)
}

function getPointPosition(modules: PatchModule[], point: ModulePoint): PosGrid {
  const module = modules[point[0]]
  const blocks = blockEntries(module.blocks)
  const blockIndex = point[1] ? blocks.findIndex((b) => b[1].position === point[1]) : 0
  const page = module.page
  const startPosition = module.position[0]
  const position = startPosition + blockIndex
  const x = position % GX
  const y = (position - x) / GX

  return { page, x, y, module, blockName: '???' }
}
