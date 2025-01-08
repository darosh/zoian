import type { BlockView } from '../view/types.ts'
import { getParamType, PARAM_RANGE, ParamType, type Range } from './param-types.ts'
import { adjustedParam, UINT16_MAX } from './param-convert.ts'

export type Display = (value: number, range: Range | Range[]) => number | string

export const PARAM_DISPLAY: Record<ParamType, Display> = {
  // Simple
  [ParamType.One]: displayLinear,
  [ParamType.Ignored]: displayLinear,
  [ParamType.Norm]: displayLinear,

  // Numeric
  [ParamType.Percent]: displayLinear,
  [ParamType.Speed]: displayLinear,
  [ParamType.Mix]: displayLinear,
  [ParamType.Swing]: displayLinear,
  [ParamType.Resonance]: displayLinear,
  [ParamType.Q]: displayLinear,
  [ParamType.Q1]: displayLinear,
  [ParamType.Ratio]: displayRatio,
  [ParamType.Div]: displayLinear,

  // Db
  [ParamType.Db0]: displayDb0,
  [ParamType.Db8]: displayLinear,
  [ParamType.Db18]: displayLinear,
  [ParamType.Db32]: displayLinear,
  [ParamType.Db40]: displayLinear,
  [ParamType.Db80]: displayLinear,
  [ParamType.Db100]: displayLinear,

  // Midi
  [ParamType.Midi]: displayLinear,
  [ParamType.NoteNum]: displayLinear,

  // Time
  [ParamType.TimeMin]: displayTime,
  [ParamType.TimeMax]: displayTimeLog,
  [ParamType.Env10]: displayTime,
  [ParamType.Env2]: displayTime,
  [ParamType.Time]: displayTimeInf,
  [ParamType.Env]: displayTime,
  [ParamType.Size]: displayTime,
  [ParamType.Position]: displayTime,
  // [ParamType.Tap]: tbd,
  [ParamType.Rate]: displayTime,
  // [ParamType.Time32]: tbd,
  // [ParamType.Time31]: tbd,
  [ParamType.Time5]: displayTime,
  [ParamType.Time34]: displayTime,
  [ParamType.Time59]: displayTime59,
  [ParamType.Time60]: displayTime,
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

  return typeof r === 'number' ? format(r) : r.replace('-', '−')
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

function formatTime(unit: string, v: number, digits: number) {
  if (unit === 'ms' && v >= 1000) {
    v /= 1000
    unit = 's'
  }

  if (digits !== 3) {
    return `${v.toFixed(digits)}\u202F${unit}`
  }

  const vr = Math.round(v)

  if (v < 10) {
    return `${v.toFixed(2)}\u202F${unit}`
  }

  if (vr >= 100 && vr < 1000) {
    return `${v.toFixed(0)}\u202F${unit}`
  }

  return `${v.toFixed(1)}\u202F${unit}`
}

export function displayTime(value: number, r: Range | Range[]) {
  const min = <number> r[0]
  const max = <number> r[1]
  const unit = <string> r[2]
  const digits = <number> r[3]
  const v = (value / UINT16_MAX) * (max - min) + min

  return formatTime(unit, v, digits)
}

export function displayTimeLog(value: number, r: Range | Range[]) {
  const min = <number> r[0]
  const max = <number> r[1]
  const unit = <string> r[2]
  const digits = <number> r[3]
  // const raw = Math.pow(10, (value / UINT16_MAX) * 3)
  // const v = min + (max - min) * (raw - 1) / (Math.pow(10, 3) - 1)
  const v = exponentialTime(min, max, value)
  return formatTime(unit, v, digits)
}

export function displayTimeInf(x: number, r: Range | Range[]) {
  const unit = <string> r[2]
  const digits = <number> r[3]

  // Constants based on the middle two points
  const x1 = 38115
  const y1 = 5
  const x2 = 65533
  const y2 = 45874.85

  const b = Math.log(y2 / y1) / (x2 - x1)
  const a = y1 / Math.exp(b * x1)

  let v

  if (x >= 65534) {
    return `inf\u202F${unit}`
  } else if (x <= 0) {
    v = 0
  } else {
    v = a * Math.exp(b * x)
  }

  return formatTime(unit, v, digits)
}

export function displayTime59(x: number, r: Range | Range[]) {
  const unit = <string> r[2]
  const digits = <number> r[3]

  // Constants based on the middle two points
  const x1 = 34656;
  const y1 = 1.00;
  const x2 = 65535;
  const y2 = 59.99;

  const b = Math.log(y2/y1)/(x2-x1);
  const a = y1/Math.exp(b*x1);
  let v

  if (x <= 0) {
    v = 0
  } else {
    v =  a * Math.exp(b*x)
  }

  return formatTime(unit, v, digits)
}

function exponentialTime(y1: number, y2: number, x: number) {
  const a = y1
  const b = Math.log(y2 / y1) / UINT16_MAX

  return a * Math.exp(b * x)
}

export function displayRatio(value: number): string {
  const max = 64244
  const from = 1
  const to = 19.6

  if (value > max) {
    return 'infinity'
  }

  const v = (value / max) * (to - from) + from

  return `${v.toFixed(1)}:1`
}

export function displayDb0(value: number): string {
  const min = 2
  const from = -90.31
  const to = -0

  if (value < min) {
    return '-inf\u202FdB'
  }

  const v = (value - min) / (UINT16_MAX - min) * (to - from) + from
  const f = v.toFixed(2)

  return `${f[0] !== '-' ? '-' : ''}${f}\u202FdB`
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
