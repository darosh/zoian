import type { Connection } from '../parser/types.ts'
import type { PosGrid } from '../grid/types.ts'

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
