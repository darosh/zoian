import type { BlockView } from '../view/types.ts'
import { getParamType, ParamType } from './param-types.ts'
import { adjustedParam, convertDb8, convertEnv, convertHz, convertMidi, convertMix, convertResonance, convertSeconds, convertSteps } from './param-convert.ts'

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
  [ParamType.Bits]: (value) => displayParam(adjustedParam(value)),
  [ParamType.Time16]: (value) => displayParam(adjustedParam(value)),
  [ParamType.Pitch]: (value) => displayParam(adjustedParam(value)),
  [ParamType.Time32]: (value) => displayParam(adjustedParam(value)),
  [ParamType.Time31]: (value) => displayParam(adjustedParam(value)),
  [ParamType.SizeSamples]: (value) => displayParam(adjustedParam(value)),
  [ParamType.ModSamples]: (value) => displayParam(adjustedParam(value)),
  [ParamType.Time5]: (value) => displayParam(adjustedParam(value)),
  [ParamType.Phase]: (value) => displayParam(adjustedParam(value)),
  [ParamType.Time34]: (value) => displayParam(adjustedParam(value)),
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
