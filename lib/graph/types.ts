import type { Connection, Patch, PatchModule } from '../parser/types.ts'
import type { PosGrid } from '../grid/types.ts'
import type { Block, ModuleSpec } from '../spec/types.ts'

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

export interface ConnectionView {
  connection: Connection
  fromModule: ModuleView
  fromBlock?: BlockView
  toModule: ModuleView
  toBlock?: BlockView
}

export interface BlockView {
  name: string
  block: Block
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

export interface PatchView {
  patch: Patch
  modules: ModuleView[]
  connections: ConnectionView[]
  orphanConnections: ConnectionView[]
}
