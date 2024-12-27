import type { Block, JackType } from '../spec/types.ts'
import type { PatchModule } from '../parser/types.ts'
import type { BlockView, JackView, ModuleView, PatchView } from '../view/types.ts'

export interface Pos {
  page: number
  x: number
  y: number
}

export type BlockColors = { light: string; dark: string; base: string }

export interface PosBlock {
  pos: 'block'
  page: number
  x: number
  y: number
  index: number

  position: number
  first: boolean
  last: boolean

  module: PatchModule
  moduleView: ModuleView
  block: Block
  blockName: string
  blockTitle: string
  blockView: BlockView
  colors: BlockColors

  forcedLast?: boolean
  display?: string
  blockDisplay?: string
}

export interface PosEuro {
  pos: 'euro'
  page: 0
  x: number
  y: number
  index: number

  type: JackType
  blockView?: BlockView
  jackView?: JackView
  colors?: BlockColors
}

export interface PosIo {
  pos: 'io'
  page: -1
  x: number
  y: 0
  index: number

  jackView: JackView
}

export type PosAny = PosBlock | PosEuro | PosIo

export type BlockMap = Map<BlockView | JackView, PosAny[]>

export type PosKind = 'block' | 'euro' | 'io'

export interface Grid {
  view: PatchView
  pagesGrid: (PosBlock | undefined)[]
  hiddenGrid: PosBlock[]
  euroGrid: PosEuro[]
  ioGrid: PosIo[]
  connections: [PosAny, PosAny][]
  connectionsEuro: [PosAny, PosAny][]
  blockMap: BlockMap
  getConnected: unknown
}
