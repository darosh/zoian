import type { BlockView } from '../view/types.ts'
import { getParamType, PARAM_RANGE, ParamType, type Range, RATIOS, SCALES } from './param-types.ts'
import { adjustedParam, convertNoteHz, exponentialToHz, linearToKey, linearToNote, timeV1, timeV100, timeV16, timeV2, timeV4, timeV8, UINT16_MAX, valueToPitch } from './param-convert.ts'

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
  [ParamType.TimeV100]: (x) => formatTime('ms', timeV100(x), 3),
  [ParamType.TimeV1]: (x) => formatTime('ms', timeV1(x), 3),
  [ParamType.TimeV2]: (x) => formatTime('ms', timeV2(x), 3),
  [ParamType.TimeV4]: (x) => formatTime('ms', timeV4(x), 3),
  [ParamType.TimeV8]: (x) => formatTime('ms', timeV8(x), 3),
  [ParamType.TimeV16]: (x) => formatTime('ms', timeV16(x), 3),

  // Hz
  [ParamType.HzHigh]: displayLinear,
  [ParamType.HzOnly]: displayLinear,
  [ParamType.HzLow]: displayLinear,

  // BPM
  [ParamType.FreqLow]: displayLinear,
  // [ParamType.ClockTime]: displayLinear,
  [ParamType.DelayTime]: displayLinear,
  // [ParamType.TapMulti]: displayLinear,
  // [ParamType.TapMultiRev]: displayLinear,
  // [ParamType.TapMultiInf]: displayLinear,
  // [ParamType.TapMulti1]: displayLinear,
  [ParamType.DelayTimeFaster]: displayLinear,
  // [ParamType.TapMulti2]: displayLinear,

  // Pitch
  [ParamType.Note]: (x) => displayNote(convertNoteHz(x)),
  [ParamType.Hz]: (x) => displayHz(exponentialToHz(x)),
  [ParamType.Step]: linearToNote,
  [ParamType.Pitch]: displayLinear,
  [ParamType.Key]: linearToKey,

  // Special
  [ParamType.Song]: displaySong,
  [ParamType.Pan]: displayPan,
  [ParamType.SizeSamples]: displayLinear,
  [ParamType.ModSamples]: displayLinear,
  [ParamType.Phase]: displayLinear,
  [ParamType.PitchCents]: valueToPitch,
  [ParamType.HzRound]: displayLinear,
  [ParamType.Steps]: displayLinear,
  [ParamType.Scale]: displayScale,
  [ParamType.ScaleBasic]: displayScaleBasic,
  [ParamType.TapRatio]: displayTapRatio,
  [ParamType.Bits]: displayLinear,
  [ParamType.BitsFractional]: displayLinear,
}

export const MINUS = '−'
// export const SPACE = '\u202F'
// export const SPACE = ' '
export const SPACE = '\u2005'
// export const JOIN = ' / '
export const JOIN = ',\u2002'

export function displayParameter(bv: BlockView, value: number): number | string {
  const pt = getParamType(bv.name, bv.moduleView.spec)
  let r

  if (!Array.isArray(pt)) {
    r = PARAM_DISPLAY[pt](value, PARAM_RANGE[pt])
  } else {
    const ppt = <ParamType> pt.find((x) => bv.moduleView.module.options[x[1]] === x[2])?.[0]
    r = PARAM_DISPLAY[ppt](value, PARAM_RANGE[ppt])
  }

  return typeof r === 'number' ? format(r) : r.replace('-', MINUS)
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

  return r.replace('-', MINUS)
}

export function displayParameterOne(value: number): number | string {
  return format(adjustedParam(value))
}

export function displayLinear(value: number, range: Range | Range[]): number | string {
  const ranges = <[min: number, max: number, string, number][]> (Array.isArray(range[0]) ? range : [range])

  let first: number

  return ranges.map((r) => {
    let v

    if (typeof r[0] === 'function') {
      v = (<(x: number) => number> r[0])(first ?? value)
      first = typeof first === 'undefined' ? v : first
    } else {
      v = (value / UINT16_MAX) * (r[1] - r[0]) + r[0]
      first = typeof first === 'undefined' ? v : first
    }

    if (r[2] === 'delay-time') {
      return formatDelayTime(v)
    }

    return `${r[2] && r[2].at(-1) === '=' ? r[2] : ''}${format(v, r[2], r[3])}${(r[2] && r[2].at(-1) !== '=') ? `${SPACE}${r[2]}` : ''}`
      .replace('Infinity', 'inf')
  }).join(JOIN)
}

function formatDelayTime(v: number) {
  let unit = 'ms'

  if (v >= 1000) {
    v /= 1000
    unit = 's'
    return `${v.toFixed(3)}${SPACE}${unit}`
  }

  return `${v.toFixed(1)}${SPACE}${unit}`
}

function formatTime(unit: string, v: number, digits: number) {
  if (unit === 'ms' && v >= 1000) {
    v /= 1000
    unit = 's'
  }

  if (digits !== 3) {
    return `${v.toFixed(digits)}${SPACE}${unit}`
  }

  const vr = Math.round(v)

  if (v < 10) {
    return `${v.toFixed(2)}${SPACE}${unit}`
  }

  if (vr >= 100 && vr < 1000) {
    return `${v.toFixed(0)}${SPACE}${unit}`
  }

  return `${v.toFixed(1)}${SPACE}${unit}`
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
    return `inf${SPACE}${unit}`
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
  const x1 = 34656
  const y1 = 1.00
  const x2 = 65535
  const y2 = 59.99

  const b = Math.log(y2 / y1) / (x2 - x1)
  const a = y1 / Math.exp(b * x1)
  let v

  if (x <= 0) {
    v = 0
  } else {
    v = a * Math.exp(b * x)
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
    return `${MINUS}inf${SPACE}dB`
  }

  const v = (value - min) / (UINT16_MAX - min) * (to - from) + from
  const f = v.toFixed(2)

  return `${f[0] !== '-' ? '-' : ''}${f}${SPACE}dB`
}

export function displayParam(value: number) {
  return Math.round(value * 100) / 100
}

export function displayHz(value: number) {
  const r = Math.round(value)
  let f = 2

  if (r >= 10000) {
    f = 1
  }

  return `${value.toFixed(f)}${SPACE}Hz`
}

export function displayPan(value: number) {
  const right = Math.round(value / UINT16_MAX * 100)
  const left = 100 - right

  return `L${left} R${right}`
}

const A4 = 440
const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

function displayNote(frequency: number): string {
  // Calculate the number of half steps from A4
  const halfSteps = Math.round(12 * Math.log2(frequency / A4))

  // MIDI note number relative to A4 (MIDI 69)
  const midiNote = 69 + halfSteps

  // Determine the octave and note index
  const octave = Math.floor(midiNote / 12) - 1
  const noteIndex = midiNote % 12

  // Combine the note name and octave
  return NOTES[noteIndex] + octave
}

const TICKS_PER_BEAT = 24
const BEATS_PER_MEASURE = 4
const TOTAL_TICKS = 98298 // Ticks from 1:01:00 to 1024:04:18
const TICKS_PER_UINT16 = TOTAL_TICKS / 65535

export function displaySong(value: number) {
  // Convert to ticks
  const ticks = Math.floor(value * TICKS_PER_UINT16)

  // Calculate position components
  const totalBeats = Math.floor(ticks / TICKS_PER_BEAT)
  const measure = Math.floor(totalBeats / BEATS_PER_MEASURE) + 1
  const beat = (totalBeats % BEATS_PER_MEASURE) + 1
  const tick = ticks % TICKS_PER_BEAT

  // Format as string
  return `${measure}:${beat.toString().padStart(2, '0')}:${tick.toString().padStart(2, '0')}`
}

export function displayScale(value: number) {
  const i = value / UINT16_MAX * (SCALES.length - 1)

  return SCALES[Math.round(i)]
}

export function displayScaleBasic(value: number) {
  const i = value / UINT16_MAX * (5 - 1)

  return SCALES[Math.round(i)]
}

export function displayTapRatio(value: number) {
  const i = value / UINT16_MAX * (RATIOS.length - 1)

  return RATIOS[Math.round(i)]
}
