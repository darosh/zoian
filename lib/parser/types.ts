import type { Blocks } from '../spec/types.ts'
import type { Colors } from '../spec/colors.ts'

export interface Patch {
  name?: string
  size?: number
  zebu?: boolean
  cpu: number
  pages: { name: string; index: number }[]
  starred: Starred[]
  modules: PatchModule[]
  connections: Connection[]
}

export interface PatchModule {
  number: number
  id: number
  type: string
  name: string
  version: number
  zebu?: boolean
  cpu: number
  size: number
  dataSize: number
  page: number
  color: Colors
  options: Record<string, string | number>
  parameterCount: number
  parameters: Record<string, number>
  blocks: Blocks
  position: number[]
  optionsList?: number[]
  optionsBinary?: Record<string, number>
}

export interface Starred {
  module: number
  block: number
  cc?: number
}

export type BlockPoint = [mod: number, blo: number]

export interface Connection {
  source: BlockPoint
  target: BlockPoint
  strength: number
}
