import type { Pos } from './types.ts'

enum Side {
  Left,
  Right,
  Top,
  Bottom,
}

// const LAST_ROW = GX * (GY - 1)

function determineConnectionSide({ source, target }: P): {
  sourceSide: Side
  targetSide: Side
} {
  // Calculate the actual distance between blocks
  const dx = target.x - source.x
  const dy = target.y - source.y
  // const isBottomRow = LAST_ROW >= index

  // Use the greater distance to determine primary connection direction
  if (Math.abs(dx) > Math.abs(dy)) {
    // Horizontal connection is preferred
    return {
      sourceSide: dx > 0 ? Side.Right : Side.Left,
      targetSide: dx > 0 ? Side.Left : Side.Right,
    }
  } else {
    // Vertical connection is preferred
    return {
      sourceSide: dy > 0 ? Side.Bottom : Side.Top,
      targetSide: dy > 0 ? Side.Top : Side.Bottom,
    }
  }
}

function getConnectionPoint(block: Pos, side: Side, BLOCK_HALF_WIDTH: number): Pos {
  switch (side) {
    case Side.Left:
      return <Pos> { x: block.x - BLOCK_HALF_WIDTH, y: block.y }
    case Side.Right:
      return <Pos> { x: block.x + BLOCK_HALF_WIDTH, y: block.y }
    case Side.Top:
      return <Pos> { x: block.x, y: block.y - BLOCK_HALF_WIDTH }
    case Side.Bottom:
      return <Pos> { x: block.x, y: block.y + BLOCK_HALF_WIDTH }
  }
}

interface P {
  source: Pos
  target: Pos
}

export function getConnectionPoints(connection: P, sh: number, th: number): P {
  const { sourceSide, targetSide } = determineConnectionSide(connection)

  return {
    source: getConnectionPoint(connection.source, sourceSide, sh),
    target: getConnectionPoint(connection.target, targetSide, th),
  }
}
