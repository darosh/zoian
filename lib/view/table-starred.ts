import type { Patch } from '../parser/types.ts'
import { blockEntries } from '../parser/utils/block-entries.ts'
import type { StarredRow } from './types.ts'

export function getStarredTable(patch: Patch): StarredRow[] {
  let err = false

  const arr: unknown = patch.starred.map((s) => {
    const module = patch.modules[s.module]
    const blockEntry = module ? blockEntries(module.blocks)[s.block] : undefined

    if (!module) {
      err = true
    }

    return {
      ...s,
      module,
      blockEntry,
    }
  })

  if (err) {
    ;(<Record<string, boolean>> arr).error = err
  }

  return <StarredRow[]> arr
}
