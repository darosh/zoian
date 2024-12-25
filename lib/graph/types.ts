import type { Connection, Patch, PatchModule } from '../parser/types.ts'
import type { Block, Jack, ModuleSpec } from '../spec/types.ts'

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

export interface MidiRow {
  input: boolean
  module: PatchModule
  channel: number
}

export interface MidiTable {
  output: MidiRow[]
  input: MidiRow[]
}

export type ModulePoint = [mod: number, blo?: number]

export type JackPoint = [jack: string]

export interface IoConnection {
  source: ModulePoint | JackPoint
  target: ModulePoint | JackPoint
}

export interface ConnectionView {
  connection: Connection | IoConnection
  fromBlock?: BlockView | JackView
  toBlock?: BlockView | JackView
}

export interface BlockView {
  name: string
  index: number
  block: Block
  moduleView: ModuleView
  from: ConnectionView[]
  to: ConnectionView[]
}

export interface ModuleView {
  module: PatchModule
  spec: ModuleSpec
  from: ConnectionView[]
  to: ConnectionView[]
  blockViews: BlockView[]
}

export interface PatchJack {
  active: boolean
  id: string
  io?: boolean
  euro?: boolean
}

export interface JackView {
  jack: PatchJack
  spec: Jack
  from: ConnectionView[]
  to: ConnectionView[]
}

export interface PatchView {
  patch: Patch
  moduleViews: ModuleView[]
  blockViews: BlockView[]
  ioJackViews: JackView[]
  connections: ConnectionView[]
  orphanConnections: ConnectionView[]
  midiTable: MidiTable
  cpuTable: CpuRow[]
  starredTable: StarredRow[]
}
