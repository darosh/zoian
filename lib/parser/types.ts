import type { Blocks } from '../spec/types.ts'
import type { Colors } from '../spec/colors.ts'

export interface Patch {
  name?: string
  size?: number
  euro?: boolean
  pages: { name: string; index: number }[]
  numPages?: number
  starred: Starred[]
  modules: PatchModule[]
  connections: Connection[]
  colors?: number[]
}

export interface PatchModule {
  number: number
  id: number
  type: string
  name: string
  version: number
  euro?: boolean
  size: number
  dataSize: number
  page: number
  color: Colors
  originalColor?: number
  options: Record<string, string | number>
  parameterCount: number
  parameters: Record<string, number>
  parametersRaw?: number[]
  blocks: Blocks
  position: number[]
  dataBytes?: number[]
  originalPosition?: number
  originalPage?: number
  optionsList?: number[]
  optionsBinary?: Record<string, number>
  offset?: number
  // nameBytes?: number[]
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
