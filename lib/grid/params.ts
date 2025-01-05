import type { BlockView } from '../view/types.ts'
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

export const PARAM_DISPLAY: Record<ParamType, (value: number) => number | string> = {
  [ParamType.Unknown]: (value) => displayParam(adjustedParam(value)),
  [ParamType.One]: (value) => displayParam(adjustedParam(value)),
  [ParamType.Ignored]: (value) => displayParam(adjustedParam(value)),
  [ParamType.Norm]: (value) => displayParam(adjustedParam(value)),
  [ParamType.Db0]: (value) => displayParam(adjustedParam(value)),
  [ParamType.Db8]: (value) => displayDb(convertDb8(value)),
  [ParamType.Db40]: (value) => displayParam(adjustedParam(value)),
  [ParamType.Db100]: (value) => displayParam(adjustedParam(value)),
  [ParamType.Midi]: (value) => convertMidi(value),
  [ParamType.NoteNum]: (value) => displayParam(adjustedParam(value)),
  [ParamType.Note]: (value) => displayNote(convertHz(value)),
  [ParamType.Resonance]: (value) => displayParam(convertResonance(value)),
  [ParamType.Song]: (value) => displayParam(adjustedParam(value)),
  [ParamType.Percent]: (value) => displayParam(adjustedParam(value)),
  [ParamType.Pan]: (value) => displayPan(adjustedParam(value)),
  [ParamType.Q]: (value) => displayParam(adjustedParam(value)),
  [ParamType.Hz]: (value) => displayHz(convertHz(value)),
  [ParamType.HzRound]: (value) => displayParam(adjustedParam(value)),
  [ParamType.Step]: (value) => displayHzNote(convertHz(value)),
  [ParamType.Mix]: (value) => displayParam(convertMix(value)),
  [ParamType.Time]: (value) => displaySeconds(convertSeconds(value)),
  [ParamType.Env]: (value) => displayEnv(convertEnv(value)),
  [ParamType.Steps]: (value) => displaySteps(convertSteps(value)),
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

export function displayParameter(bv: BlockView, value: number): number | string {
  const pt = getParamType(bv.name, bv.moduleView.spec)

  return PARAM_DISPLAY[pt](value)
}

export function displayParam(value: number) {
  return Math.round(value * 100) / 100
}

export function displayHz(value: number) {
  return `${Math.round(value * 100) / 100}\u202FHz`
}

export function displayDb(value: number) {
  return `${Math.floor(value * 100) / 100}\u202FdB`.replace('-', '−')
}

export function displaySeconds(value: number) {
  return `${value.toFixed(2)}\u202Fs`
}

export function displayHzNote(frequency: number) {
  return `${displayHz(frequency)} / ${displayNote(frequency)}`
}

export function displayEnv(ms: number) {
  if (ms >= 1000) {
    return `${(ms / 1000).toFixed(2)}\u202Fs`
  }

  if (ms >= 100) {
    return `${ms.toFixed(0)}\u202Fms`
  }

  if (ms >= 10) {
    return `${ms.toFixed(1)}\u202Fms`
  }

  return `${ms.toFixed(2)}\u202Fms`
}

export function displaySteps(steps: number) {
  return `${steps}\u202Fsteps`
}

export function displayPan(value: number) {
  const left = Math.round(value * 100)
  const right = 100 - left

  return `L${left} R${right}`
}

const UINT16_MAX = 65535
const DB_CENTER = 32767

export function adjustedParam(raw: number): number {
  return raw / UINT16_MAX
}

export function convertMidi(value: number): number {
  return Math.floor((value / UINT16_MAX) * 127)
}

export function convertSeconds(value: number) {
  // Range: 4.02 to inf
  if (value === 0) return 4.02

  const normalized = value / UINT16_MAX

  return Number((normalized * (100 - 4.02) + 4.02).toFixed(2))
}

export function convertDb8(value: number) {
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

const HZ_MIN = 27.5
const HZ_MAX = 23999

export function convertHz(value: number) {
  const normalized = value / UINT16_MAX

  return normalized * (HZ_MAX - HZ_MIN) + HZ_MIN
}

const ENV_MIN = 1.33
const ENV_MAX = 60000

export function convertEnv(value: number) {
  const normalized = value / UINT16_MAX

  return normalized * (ENV_MAX - ENV_MIN) + ENV_MIN
}

const STEPS_MIN = 2
const STEPS_MAX = 63

export function convertSteps(value: number) {
  const normalized = value / UINT16_MAX

  return Math.floor(normalized * (STEPS_MAX - STEPS_MIN) + STEPS_MIN)
}

const RESO_MIN = 1
const RESO_MAX = 999.9

export function convertResonance(value: number) {
  const normalized = value / UINT16_MAX

  return Math.floor(normalized * (RESO_MAX - RESO_MIN) + RESO_MIN)
}

const A4 = 440
const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

function displayNote(frequency: number): string {
  // Calculate number of half steps from A4
  // 12 * log2(f/440) gives us the number of half steps
  const halfSteps = Math.round(12 * Math.log2(frequency / A4))

  // Calculate octave and note index
  // A4 is 9 half steps above C4, so we adjust our calculation accordingly
  const octave = Math.floor((halfSteps + 69) / 12) - 1
  const noteIndex = ((halfSteps + 69) % 12 + 12) % 12

  // Combine note name and octave
  return NOTES[noteIndex] + octave
}
