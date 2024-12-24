import type { Connection, Patch, PatchModule } from '../parser/types.ts'
import type { PosGrid } from '../grid/types.ts'
import type { Block, Jack, ModuleSpec } from '../spec/types.ts'

export type ModulePoint = [mod: number, blo?: number]

export type JackPoint = [jack: string]

export interface IoConnection {
  source: ModulePoint | JackPoint
  target: ModulePoint | JackPoint
}

export interface ConnectionPos {
  connection: Connection
  source: PosGrid
  target: PosGrid
}

export interface CpuRow {
  id: number
  count: number
  cpu: number
  pages: number[]
  pageDisplay: string
  cpuSum: number
}

export interface StarredRow {
  block: number
  cc?: number
  module: PatchModule
  blockEntry: [string, Block]
}

export interface ConnectionView {
  connection: Connection
  fromModule: ModuleView
  fromBlock?: BlockView
  toModule: ModuleView
  toBlock?: BlockView
}

export interface BlockView {
  name: string
  index: number
  block: Block
  module: ModuleView
  from: ConnectionView[]
  to: ConnectionView[]
}

export interface ModuleView {
  module: PatchModule
  spec: ModuleSpec
  from: ConnectionView[]
  to: ConnectionView[]
  blocks: BlockView[]
}

export interface PatchJack {
  active: boolean
}

export interface JackView {
  jack: PatchJack
  spec: Jack
  from: ConnectionView[]
  to: ConnectionView[]
  blocks: BlockView[]
}

export interface PatchView {
  patch: Patch
  modules: ModuleView[]
  ios: JackView[]
  connections: ConnectionView[]
  orphanConnections: ConnectionView[]
  cpuTable: CpuRow[]
  starredTable: StarredRow[]
}
