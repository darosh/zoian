import type { Connection, Patch, PatchModule } from '../parser/types.ts'
import type { Block, Jack, ModuleSpec } from '../spec/types.ts'

export enum ConnectionType {
  Missing = -2,
  Mixed = -1,
  Unknown,
  CV,
  Audio,
}

export interface CpuRow {
  id: number
  count: number
  cpu: number
  pages: number[]
  pageDisplay: string
  cpuSum: number
}

export interface CpuTable {
  rows: CpuRow[]
  sum: number
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

export interface ConnectionTable {
  counts: {
    audio: number
    cv: number
    mixed: number
    unknown: number
    missing: number
  }
  rows: { type: ConnectionType; count: number }[]
  total: number
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
  type: ConnectionType
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
  cpuTable: CpuTable
  starredTable: StarredRow[]
  connectionTable: ConnectionTable
}
