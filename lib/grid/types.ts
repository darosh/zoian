import type { Block, JackType } from '../spec/types.ts'
import type { PatchModule } from '../parser/types.ts'

export interface Pos { page: number; x: number; y: number }

export interface PosBlock {
  page: number
  x: number
  y: number
  position: number
  first: boolean
  last: boolean
  forcedLast?: boolean
  display?: string
  module: PatchModule
  block: Block
  blockName: string
}

export interface PosJack {
  page: 0
  x: number
  y: number
  id?: string
  type: JackType
  index: number
  module?: PatchModule
}

export interface PosIo {
  page: -1
  x: number
  y: 0
  input?: boolean
  zebu?: boolean
  active: boolean
  text?: string
  type: JackType
  modules: ({ id: number; block?: string; prop?: string; value?: string } | number)[]
}

export interface PosGrid {
  page: number
  x: number
  y: number
  id?: string
  module?: PatchModule
  blockName: string
  io?: boolean
}
