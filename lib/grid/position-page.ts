import { G, GX } from '../spec/const.ts'
import type { Pos } from './types.ts'

export function getPagePosition(index: number): Pos {
  const pos = index % G
  const page = (index - pos) / G
  const x = pos % GX
  const y = (pos - x) / GX

  return {
    page,
    x,
    y,
  }
}
