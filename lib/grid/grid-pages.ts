import debug from 'debug'
import { G, GX } from '../spec/const.ts'
import type { PosBlock } from './types.ts'
import { DISPLAY_MODULE } from '../spec/display-module.ts'
import { DISPLAY_BLOCK } from '../spec/display-blocks.ts'
import { BLOCK_COLORS } from './rgb-colors.ts'
import type { PatchView } from '../graph/types.ts'

const log = debug('zoian:grid')

export function getPagesGrid(view: PatchView): (PosBlock | undefined)[] {
  const map: (PosBlock | undefined)[] = Array.from({ length: view.patch.pages.length * G })

  log('pages', view.patch.pages.length)
  log('grid size', map.length)

  for (const moduleView of view.modules) {
    const startPage = moduleView.module.page * G
    const startPosition = moduleView.module.position[0]

    const blocks = moduleView.blocks
    const offsetPage = view.patch.euro ? 1 : 0

    for (const blockView of blocks) {
      const position = startPosition + blockView.index
      const x = position % GX
      const y = (position - x) / GX

      if (position >= G) {
        continue
      }

      const first = position === moduleView.module.position[0]

      map[startPage + position + offsetPage * G] = {
        position,
        x,
        y,
        first,
        last: position === moduleView.module.position.at(-1),
        module: moduleView.module,
        moduleView: moduleView,
        block: blockView.block,
        blockName: blockView.name,
        blockView: blockView,
        page: moduleView.module.page + offsetPage,
        colors: BLOCK_COLORS[moduleView.module.color],
      }
    }
  }

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
