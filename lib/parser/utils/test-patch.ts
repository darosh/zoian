import type { Patch, PatchModule } from '../../parser/types.ts'
import { MODULES } from '../../spec/modules.ts'
import { Colors } from '../../spec/colors.ts'
import { GX, GY } from '../../spec/const.ts'

export function getTestPatch(): Patch {
  let page = 0
  let row = 0
  let color = 1
  const modules: PatchModule[] = []

  MODULES.forEach((m, i) => {
    for (let blocks = Math.min(GX / 2, m.maxBlocks); blocks > 0; blocks--) {
      const module = {
        ...m,
        number: i,
        type: m.name,
        version: 0,
        dataSize: 0,
        size: 0,
        page,
        color,
        options: {},
        blocks: Object.fromEntries(Object.entries(m.blocks).slice(0, blocks)),
        parameterCount: 0,
        parameters: {},
        position: Array.from({ length: blocks }).map((_c, i) => i + row * GX),
      }

      row++

      if (row === GY) {
        row = 0
        page++
      }

      modules.push(module)
    }

    color++
    color = Colors[color] ? color : 1
  })

  return {
    modules,
    pages: Array.from({ length: page + 1 }).map((_c, index) => ({
      name: '',
      index,
    })),
    connections: [],
    starred: [],
  }
}
