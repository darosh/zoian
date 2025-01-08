import type { BlockView } from '../view/types.ts'
import { getParamType, PARAM_RANGE, ParamType, type Range } from './param-types.ts'
import { adjustedParam, UINT16_MAX } from './param-convert.ts'

export type Display = (value: number, range: Range | Range[]) => number | string

export const PARAM_DISPLAY: Record<ParamType, Display> = {
  // Simple
  [ParamType.One]: displayLinear,
  [ParamType.Ignored]: displayLinear,
  [ParamType.Norm]: displayLinear,

  // [ParamType.Midi]: (value) => convertMidi(value),
  // [ParamType.Note]: (value) => displayNote(convertHz(value)),
  // [ParamType.Resonance]: (value) => displayParam(convertResonance(value)),
  // [ParamType.Pan]: (value) => displayPan(adjustedParam(value)),
  // [ParamType.Hz]: (value) => displayHz(convertHz(value)),
  // [ParamType.Step]: (value) => displayHzNote(convertHz(value)),
  // [ParamType.Mix]: (value) => displayParam(convertMix(value)),
  // [ParamType.Time]: (value) => displaySeconds(convertSeconds(value)),
  // [ParamType.Env]: (value) => displayEnv(convertEnv(value)),
  // [ParamType.Steps]: (value) => displaySteps(convertSteps(value)),
  // [ParamType.Db8]: (value) => displayDb(convertDb8(value)),

  // Numeric
  [ParamType.Percent]: displayLinear,
  [ParamType.Speed]: displayLinear,
  [ParamType.Mix]: displayLinear,
  [ParamType.Swing]: displayLinear,
  [ParamType.Resonance]: tbd,
  [ParamType.Q]: tbd,
  [ParamType.Q1]: tbd,
  [ParamType.Ratio]: tbd,
  [ParamType.Div]: tbd,

  // Db
  [ParamType.Db0]: tbd,
  [ParamType.Db8]: tbd,
  [ParamType.Db18]: tbd,
  [ParamType.Db32]: tbd,
  [ParamType.Db40]: tbd,
  [ParamType.Db80]: tbd,
  [ParamType.Db100]: tbd,

  // Midi
  [ParamType.Midi]: tbd,
  [ParamType.NoteNum]: tbd,

  // Time
  [ParamType.TimeMin]: tbd,
  [ParamType.TimeMax]: tbd,
  [ParamType.Env10]: tbd,
  [ParamType.Env2]: tbd,
  [ParamType.Time]: tbd,
  [ParamType.Env]: tbd,
  [ParamType.Size]: tbd,
  [ParamType.Position]: tbd,
  [ParamType.Tap]: tbd,
  [ParamType.Rate]: tbd,
  [ParamType.Time32]: tbd,
  [ParamType.Time31]: tbd,
  [ParamType.Time5]: tbd,
  [ParamType.Time34]: tbd,
  [ParamType.Time59]: tbd,
  [ParamType.Time60]: tbd,
  [ParamType.Time16]: tbd,

  // Hz
  [ParamType.HzHigh]: tbd,
  [ParamType.HzOnly]: tbd,
  [ParamType.HzLow]: tbd,

  // BPM
  [ParamType.FreqLow]: tbd,
  [ParamType.ClockTime]: tbd,
  [ParamType.DelayTime]: tbd,
  [ParamType.TapMulti]: tbd,
  [ParamType.TapMultiRev]: tbd,
  [ParamType.TapMultiInf]: tbd,
  [ParamType.TapMulti1]: tbd,
  [ParamType.DelayTimeFaster]: tbd,
  [ParamType.TapMulti2]: tbd,

  // Pitch
  [ParamType.Note]: tbd,
  [ParamType.Hz]: tbd,
  [ParamType.Step]: tbd,
  [ParamType.Pitch]: tbd,
  [ParamType.Key]: tbd,

  // Special
  [ParamType.Song]: tbd,
  [ParamType.Pan]: tbd,
  [ParamType.SizeSamples]: tbd,
  [ParamType.ModSamples]: tbd,
  [ParamType.Phase]: tbd,
  [ParamType.PitchCents]: tbd,
  [ParamType.HzRound]: tbd,
  [ParamType.Steps]: tbd,
  [ParamType.Scale]: tbd,
  [ParamType.TapRatio]: tbd,
  [ParamType.Bits]: displayLinear,
  [ParamType.BitsFractional]: displayLinear,
}

export function displayParameter(bv: BlockView, value: number): number | string {
  const pt = getParamType(bv.name, bv.moduleView.spec)
  let r

  if (!Array.isArray(pt)) {
    r = PARAM_DISPLAY[pt](value, PARAM_RANGE[pt])
  } else {
    const ppt = <ParamType> pt.find((x) => bv.moduleView.module.options[x[1]] === x[2])?.[0]
    r = PARAM_DISPLAY[ppt](value, PARAM_RANGE[ppt])
  }

  return typeof r === 'number' ? format(r) : r
}

export function format(n: number, unit?: string, fixed?: number): string {
  let r = n.toString()

  if (fixed !== undefined) {
    r = n.toFixed(fixed)
  } else if (unit === '%') {
    r = n.toFixed(1)
  } else if (Math.abs(n) <= 1) {
    r = n.toFixed(4)
  }

  return r.replace('-', '−')
}

export function displayParameterOne(value: number): number | string {
  return format(adjustedParam(value))
}

export function tbd(value: number): string {
  return `${displayParameterOne(value)} ?`
}

export function displayLinear(value: number, range: Range | Range[]): number | string {
  const ranges = <[min: number, max: number, string, number][]> (Array.isArray(range[0]) ? range : [range])

  return ranges.map((r) => {
    const v = (value / UINT16_MAX) * (r[1] - r[0]) + r[0]

    return `${r[2] && r[2].at(-1) === '=' ? r[2] : ''}${format(v, r[2], r[3])}${(r[2] && r[2].at(-1) !== '=') ? `\u202F${r[2]}` : ''}`
  }).join(', ')
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
