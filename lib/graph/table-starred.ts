import type { Patch } from '../parser/types.ts'
import { blockEntries } from '../parser/utils/block-entries.ts'
import type { StarredRow } from './types.ts'

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
