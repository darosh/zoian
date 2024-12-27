import type { ModuleSpecConditions } from './types-conditions.ts'

export interface ModuleSpec {
  id: number
  category: string
  in?: boolean
  cpu: number
  name: string
  euro?: boolean
  minBlocks: number
  maxBlocks: number
  defaultBlocks: number
  params: number
  blocks: Blocks
  options: Options
  conditions?: ModuleSpecConditions
}

export interface OptionsRange {
  min: number
  max: number
}

export interface Options {
  [key: string]: {
    slot: number
    values: string[] | number[] | OptionsRange
  }
}

export interface Block {
  initial?: boolean
  param?: boolean
  position: number
  sort?: number
}

export interface Blocks {
  [key: string]: Block
}

export enum JackType {
  Blank,
  Button,
  Audio,
  Headphones,
  Midi,
  CPort,
  Stomp,
}

export enum JackLocation {
  Top,
  Bottom,
  Side,
}

export interface JackModule {
  id: number
  block?: string
  prop?: string
  value?: string
}

export interface Jack {
  id: string
  input?: boolean
  side?: JackLocation.Side
  euro?: boolean
  type: JackType
  text?: string
  title: string
  modules: (JackModule | number)[]
}
