import type { Patch } from '../../parser/types.ts'

export const EMPTY_PATCH: Patch = {
  cpu: 1,
  size: 1,
  euro: false,
  name: 'Empty Patch',
  starred: [],
  pages: [],
  modules: [],
  connections: [],
}
