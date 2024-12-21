import type { Block, Blocks } from '../../spec/types.ts'

const cache = new WeakMap()

export function blockEntries(blocks: Blocks): [string, Block][] {
  if (cache.has(blocks)) {
    return cache.get(blocks)
  }

  const entries = Object
    .entries(blocks)
    .sort((a, b) => (a[1].sort ?? a[1].position) - (b[1].sort ?? b[1].position))

  cache.set(blocks, entries)

  return entries
}
