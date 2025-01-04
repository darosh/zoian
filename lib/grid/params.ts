import type { BlockView } from '../view/types.ts'
import type { ModuleSpec } from '../spec/types.ts'

export enum ParamType {
  Unknown,
  One,
  Norm,
  Db0,
  Db8,
  Db40,
  Db100,
  Midi,
  NoteNum,
  Note,
  Resonance,
  Song,
  Percent,
  Pan,
  Q,
  Hz,
  HzRound,
  Step,
  Mix,
  Time,
}

type Range = [number | string, number | string, string?]

export const PARAM_RANGE: Record<ParamType, Range | Range[]> = {
  [ParamType.Unknown]: [0, 1, '?'],
  [ParamType.One]: [0, 1],
  [ParamType.Norm]: [-1, 1],
  [ParamType.Db0]: [-Infinity, 0, 'dB'],
  [ParamType.Db8]: [-8, 8, 'dB'],
  [ParamType.Db40]: [-40, 40, 'dB'],
  [ParamType.Db100]: [-100, 20, 'dB'],
  [ParamType.Midi]: [0, 127],
  [ParamType.NoteNum]: [21, 127],
  [ParamType.Note]: ['A0', 'A10'],
  [ParamType.Resonance]: [1, 999.9],
  [ParamType.Song]: ['001:1:0', '1024:4:18'],
  [ParamType.Percent]: [0, 100, '%'],
  [ParamType.Pan]: ['L100 R0', 'L0 R100'],
  [ParamType.Q]: [.1, 100],
  [ParamType.Hz]: [[27.5, 23999], ['A0', 'A10']],
  [ParamType.HzRound]: [28, 23999],
  [ParamType.Step]: [['A0', 'A10'], [0, 1]],
  [ParamType.Mix]: [36, 100],
  [ParamType.Time]: [4.02, Infinity, 's'],
}

export const TYPE_MAP: Record<string, ParamType> = {
  gain: ParamType.Db8,
  cc: ParamType.Midi,
  pc: ParamType.Midi,
  in: ParamType.One,
  mix: ParamType.Mix,
  send: ParamType.One,
  reset: ParamType.One,
  cv_in: ParamType.One,
  threshold: ParamType.One,
  level: ParamType.One,
  tap_cv_control: ParamType.One,
  sent: ParamType.One,
  send_position: ParamType.One,
  song_position: ParamType.Song,
  trigger_in: ParamType.One,
  gate_in: ParamType.One,
  velocity_in: ParamType.One,
  note_in: ParamType.NoteNum,
  frequency: ParamType.Hz,
  duty_cycle: ParamType.Percent,
  level_control: ParamType.Db0,
  resonance: ParamType.Resonance,
  alias_amount: ParamType.Hz,
}

export function getParamType(blockName: string, module: ModuleSpec): ParamType {
  if (module.name === 'Multi Filter') {
    if (blockName === 'gain') {
      return ParamType.Db40
    }

    if (blockName === 'frequency') {
      return ParamType.HzRound
    }

    if (blockName === 'q') {
      return ParamType.Q
    }
  }

  if (module.name === 'Audio Out') {
    if (blockName === 'gain') {
      return ParamType.Db100
    }
  }

  const t = TYPE_MAP[blockName]

  if (t >= 0) {
    return t
  }

  const w = blockName.split('_')

  if (w[0] === 'note') {
    return ParamType.Note
  }

  if (w[0] === 'step') {
    return ParamType.Step
  }

  if (w[0] === 'in') {
    return ParamType.One
  }

  if (w[0] === 'gain') {
    return ParamType.Db100
  }

  if (w[0] === 'pan') {
    return ParamType.Pan
  }

  if (w[0] === 'cv' && w[1] === 'in') {
    return ParamType.One
  }

  if (w[0] === 'atten') {
    return ParamType.Norm
  }

  return ParamType.Unknown
}

export function displayParameter(_bv: BlockView, value: number): number {
  return value
  // return displayParam(adjustedParam(value))
}

export function displayParam(value: number) {
  return Math.round(value * 100) / 100
}

const UINT16_MAX = 65535
const DB_CENTER = 32767

export function adjustedParam(raw: number) {
  return raw / 65535
}

export function convertCc(value: number): number {
  // 0 - 127
  return value
}

export function convertSeconds(value: number) {
  // Range: 4.02 to inf
  if (value === 0) return 4.02
  const normalized = value / UINT16_MAX
  return Number((normalized * (100 - 4.02) + 4.02).toFixed(2))
}

export function convertDb(value: number) {
  // Range: -8 to +8, with 32767 being 0dB
  const shifted = value - DB_CENTER
  return Number(((shifted / UINT16_MAX) * 16).toFixed(1))
}

export function convertMix(value: number) {
  // Range: 36 to 100
  if (value === 0) return 36
  const normalized = value / UINT16_MAX
  return Math.round(normalized * (100 - 36) + 36)
}
