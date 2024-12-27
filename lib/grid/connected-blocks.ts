import type { BlockView } from '../view/types.ts'
import type { BlockMap, PosAny, PosBlock } from './types.ts'

export function getConnectedBlocks(block: BlockView): BlockView[] {
  return <BlockView[]> [
    ...block.from.map((cv) => cv.toBlock),
    ...block.to.map((cv) => cv.fromBlock),
  ]
}

export function getConnectedPos(block: BlockView, map: BlockMap): PosAny[] {
  return getConnectedBlocks(block).reduce((acc, b) => {
    const pos = map.get(b)

    if (!pos) {
      return acc
    }

    return [...acc, ...pos.filter((p) => p.pos !== 'euro')]
  }, <PosAny[]> [])
}

export function getConnectedPosEuro(block: BlockView, map: BlockMap): PosAny[] {
  return getConnectedBlocks(block).reduce((acc, b) => {
    const pos = map.get(b)

    if (!pos) {
      return acc
    }

    return [
      ...acc,
      ...pos.filter((p) => {
        if (p.pos !== 'block') {
          return true
        }

        return (<PosBlock> p).page > 0
      }),
    ]
  }, <PosAny[]> [])
}
