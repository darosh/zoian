import type { Patch, PatchModule } from '../parser/types.ts'
import { blockEntries } from '../parser/utils/block-entries.ts'
import type { Block } from '../spec/types.ts'

export interface StarredRow {
  block: number
  cc?: number
  module: PatchModule
  blockEntry: [string, Block]
}

export function getStarredTable(patch: Patch): StarredRow[] {
  return patch.starred.map((s) => {
    const module = patch.modules[s.module]
    const blockEntry = blockEntries(module.blocks)[s.block]

    return {
      ...s,
      module,
      blockEntry,
    }
  })
}
