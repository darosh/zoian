import debug from 'debug'
import { G, GX } from '../spec/const.ts'
import { MODULES } from '../spec/modules.ts'
import { blockEntries } from '../parser/utils/block-entries.ts'
import type { Patch } from '../parser/types.ts'
import type { PosBlock } from './types.ts'

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

    if (m.first || (m.x === 7)) {
      const single = Object.keys(m.module.blocks).length === 1 ||
        m.forcedLast

      m.display = ((single || m.x === 7) && MODULES[m.module.id].display1) || MODULES[m.module.id].display || m.module.type
    }
  })

  log('final grid size', map.length)

  return map
}
