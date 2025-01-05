import type { ModuleSpec } from '../spec/types.ts'

export enum ParamType {
  Unknown,
  One,
  Ignored,
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
  Env,
  Steps,
}

type Range = [number | string, number | string, string?]

export const PARAM_RANGE: Record<ParamType, Range | Range[]> = {
  [ParamType.Unknown]: [0, 1, '?'],
  [ParamType.One]: [0, 1],
  [ParamType.Ignored]: [0, 1],
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
  [ParamType.Env]: [1.33, 60000, 'ms'],
  [ParamType.Steps]: [2, 63, 'steps'],
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
  decay_time: ParamType.Time,
  low_eq: ParamType.Db8,
  high_eq: ParamType.Db8,
  attack: ParamType.Env,
  decay: ParamType.Env,
  sustain: ParamType.Env,
  release: ParamType.Env,
  hold_attack_decay: ParamType.Env,
  hold_sustain_release: ParamType.Env,
  retrigger: ParamType.One,
  delay: ParamType.Env,
  trigger: ParamType.One,
  quant_steps: ParamType.Steps,
  out_select: ParamType.Ignored,
  bypass: ParamType.Ignored,
  aux: ParamType.Ignored,
  performance: ParamType.Ignored,
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
