import { GX, GXL, GYL } from '../spec/const.ts'
import type { Pos, PosAny, PosIo } from './types.ts'
import { JackType } from '../spec/types.ts'

enum Side {
  Left,
  Top,
  Right,
  Bottom,
}

type BestSides = [number, number, number, number]

type SideJob = { pos: PosAny; sides: BestSides; best: number; svg: Pos; dot: Pos }

export interface SideIndex {
  block: SideJob[]
  euro: SideJob[]
  io: SideJob[]
}

interface ConnectionPos {
  source: PosAny
  target: PosAny
}

interface ConnectionVecPos {
  source: PosAny
  target: PosAny
  sourcePos: PosAny
  targetPos: PosAny
}

function getSide(s: BestSides) {
  const sm = Math.max(...s)
  return s.findIndex((x) => x === sm)
}

function connectionSides({ source, target }: ConnectionPos): { sourceSide: Side; targetSide: Side } {
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

function getConnectionPoint(block: Pos, side: Side, width: number): Pos {
  switch (side) {
    case Side.Left:
      return <Pos> { x: block.x - width, y: block.y }
    case Side.Right:
      return <Pos> { x: block.x + width, y: block.y }
    case Side.Top:
      return <Pos> { x: block.x, y: block.y - width }
    case Side.Bottom:
      return <Pos> { x: block.x, y: block.y + width }
  }
}

function getConnectionPointCorner(block: Pos, side: Side, sides: BestSides, width: number): Pos {
  const a = getConnectionPoint(block, side, width)

  const scp: BestSides = [...sides]

  scp[side] = 0
  scp[(side + 2) % 4] = 0

  return getConnectionPoint(a, getSide(scp), width)
}

export function getPointsSides(connections: ConnectionVecPos[], small: number, large: number): SideIndex {
  const INDEX = {
    block: <SideJob[]> [],
    euro: <SideJob[]> [],
    io: <SideJob[]> [],
  }

  function add(pos: PosAny, svg: Pos, isSource: boolean, s: Side) {
    const i = pos.index
    INDEX[pos.pos][i] = INDEX[pos.pos][i] || { pos, sides: [0, 0, 0, 0], best: 0, isSource, svg }
    INDEX[pos.pos][i].sides[s] = +.5
  }

  for (const con of connections) {
    const { sourceSide, targetSide } = connectionSides(con)

    add(con.sourcePos, con.source, true, sourceSide)
    add(con.targetPos, con.target, false, targetSide)
  }

  for (const i in INDEX.io) {
    const o = INDEX.io[i]
    o.sides[Side.Bottom]++
    o.sides[Side.Right]++
  }

  for (const i in INDEX.euro) {
    const o = INDEX.euro[i]

    if (o.pos.x === 0 || o.pos.x === 1) {
      o.sides[Side.Bottom]++
    }

    if (o.pos.x > 1 && o.pos.x < 10) {
      o.sides[Side.Top]++
    }

    if (o.pos.x === 10) {
      o.sides[Side.Left]++
    }
  }

  for (const i in INDEX.block) {
    const o = INDEX.block[i]

    if (o.pos.y === 0) {
      o.sides[Side.Top]++
      o.sides[Side.Top]++
    } else if (o.pos.y === GYL) {
      o.sides[Side.Bottom]++
      o.sides[Side.Bottom]++
    }

    if (o.pos.x === 0) {
      o.sides[Side.Left]++
    } else if (o.pos.x === GXL) {
      o.sides[Side.Right]++
    }

    if (o.pos.x > 0 && o.pos.x < GXL) {
      const l = !INDEX.block[o.pos.index - 1]
      const r = !INDEX.block[o.pos.index + 1]

      if (l) {
        o.sides[Side.Left]++
      }

      if (r) {
        o.sides[Side.Right]++
      }

      if (!l && !r) {
        o.sides[Side.Top]++
        o.sides[Side.Bottom]++
        o.sides[Side.Bottom]++
      }
    }

    if (o.pos.y > 0 && o.pos.y < GYL) {
      if (!INDEX.block[o.pos.index - GX]) {
        o.sides[Side.Top]++
        o.sides[Side.Top]++
      }

      if (!INDEX.block[o.pos.index + GX]) {
        o.sides[Side.Bottom]++
        o.sides[Side.Bottom]++
        o.sides[Side.Bottom]++
      }
    }
  }

  for (const a of INDEX.euro) {
    if (!a) {
      continue
    }

    a.best = getSide(a.sides)
    a.dot = getConnectionPoint(a.svg, a.best, small)
  }

  for (const a of INDEX.io) {
    if (!a) {
      continue
    }

    const w = (<PosIo> a.pos).jackView.spec.type === JackType.Stomp ? small : small * .7

    a.best = getSide(a.sides)
    a.dot = getConnectionPointCorner(a.svg, a.best, a.sides, w)
  }

  for (const a of INDEX.block) {
    if (!a) {
      continue
    }

    a.best = getSide(a.sides)
    a.dot = getConnectionPoint(a.svg, a.best, large)
  }

  return INDEX
}
