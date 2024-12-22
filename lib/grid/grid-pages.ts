import debug from 'debug'
import { G, GX } from '../spec/const.ts'
import { blockEntries } from '../parser/utils/block-entries.ts'
import type { Patch } from '../parser/types.ts'
import type { PosBlock } from './types.ts'
import { DISPLAY_MODULE } from '../spec/display-module.ts'
import { DISPLAY_BLOCK } from '../spec/display-blocks.ts'
import { BLOCK_COLORS } from './rgb-colors.ts'

const log = debug('zoian:grid')

export function getPagesGrid(patch: Patch): (PosBlock | undefined)[] {
  const map: (PosBlock | undefined)[] = Array.from({ length: patch.pages.length * G })

  log('pages', patch.pages.length)
  log('grid size', map.length)

  patch.modules.forEach((module) => {
    const startPage = module.page * G
    const startPosition = module.position[0]

    const blocks = blockEntries(module.blocks)
    const offsetPage = patch.zebu ? 1 : 0

    blocks.forEach(([blockName, block], index) => {
      const position = startPosition + index
      const x = position % GX
      const y = (position - x) / GX

      if (position >= G) {
        return
      }

      const first = position === module.position[0]

      map[startPage + position + offsetPage * G] = {
        position,
        x,
        y,
        first,
        last: position === module.position.at(-1),
        module,
        block,
        blockName,
        page: module.page + offsetPage,
        colors: BLOCK_COLORS[module.color],
      }
    })
  })

  map.forEach((m, index) => {
    if (!m) {
      return
    }

    if (!m.last) {
      m.forcedLast = !map[index + 1] || (map[index + 1]?.module !== m.module)
    }

    if (m.first) {
      let space = 0
      let i = index

      while ((map[i]?.module === m.module) && ((<PosBlock> map?.[i])?.x < GX)) {
        space++
        i++

        if (!(<PosBlock> map?.[i])?.x) {
          break
        }
      }

      m.display = DISPLAY_MODULE[m.module.id][space - 1] || m.module.type
    }

    // m.blockDisplay = m.blockName.replaceAll('_', '').slice(0, 4)
    m.blockDisplay = DISPLAY_BLOCK[m.blockName]
    m.colors = BLOCK_COLORS[m.module.color]
  })

  log('final grid size', map.length)

  return map
}
