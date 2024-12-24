import type { BlockView } from '../graph/types.ts'

export function getConnectedBlocks(block: BlockView): BlockView[] {
  return <BlockView[]> [
    ...block.from.map((cv) => cv.toBlock),
    ...block.to.map((cv) => cv.fromBlock),
  ]
}
