import { G } from '../spec/const.ts'
import type { PatchModule } from './types.ts'

export function calculatePages(modules: PatchModule[]) {
  const pages = modules
    .filter((m) => !m.zebu)
    .map((m) => modulePage(m))

  return { first: Math.min(...pages), last: Math.max(...pages) }
}

function modulePage(module: PatchModule) {
  const page = module.page + Math.floor((module.position.at(-1) ?? 0) / G)

  // return page >= 127 ? -1 : page
  return page > 127 ? 127 - page : page
}
