export const UINT16_MAX = 65535

export function adjustedParam(raw: number): number {
  return raw / UINT16_MAX
}

const HZ_MIN = 27.5
const HZ_MAX = 23999

export function convertHz(value: number) {
  const normalized = value / UINT16_MAX

  return normalized * (HZ_MAX - HZ_MIN) + HZ_MIN
}

const HZ_A10 = 28160

export function convertNoteHz(value: number) {
  const normalized = value / UINT16_MAX

  return normalized * (HZ_A10 - HZ_MIN) + HZ_MIN
}

const STEPS_MIN = 2
const STEPS_MAX = 63

export function convertSteps(value: number) {
  const normalized = value / UINT16_MAX

  return Math.floor(normalized * (STEPS_MAX - STEPS_MIN) + STEPS_MIN)
}

export function exponentialToHz(value: number) {
  const CENTER_VALUE = 32768 // 2^15
  const CENTER_FREQ = 880 // A5
  const MAX_FREQ = 23999.0

  // Calculate octaves from center frequency (A5)
  const octavesFromCenter = (value - CENTER_VALUE) / (CENTER_VALUE / 5)

  // Return frequency using octave multiplication
  const real = CENTER_FREQ * Math.pow(2, octavesFromCenter)

  return Math.min(MAX_FREQ, real)
}

const NOTES = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#']
const STEPS_PER_OCTAVE = 6553.5
const STEPS_PER_NOTE = STEPS_PER_OCTAVE / 12

export function linearToNote(value: number) {
  const octave = Math.floor(value / STEPS_PER_OCTAVE)
  const noteIndex = Math.floor((value % STEPS_PER_OCTAVE) / STEPS_PER_NOTE) % 12

  return `${NOTES[noteIndex]}${octave}`
}

const STEPS_PER_KEY = UINT16_MAX / 12

export function linearToKey(value: number) {
  const noteIndex = Math.min(Math.floor(value / STEPS_PER_KEY), 11)

  return NOTES[noteIndex]
}

function valueToPitchRaw(value: number) {
  const RANGES = [
    [0, -12], // Octave down
    [8192, -5], // Perfect fourth down
    [16384, -4], // Major third down (mirror of +4)
    [24576, -0.1], // 10 cents down (mirror of +10c)
    [32768, 0], // Center - no change
    [40960, 0.1], // 10 cents up
    [49152, 4], // Major third up
    [57344, 5], // Perfect fourth up
    [65535, 12], // Octave up
  ]

  // Find the appropriate range
  for (let i = RANGES.length - 1; i >= 0; i--) {
    if (value >= RANGES[i][0]) {
      return RANGES[i][1]
    }
  }

  return -12 // Fallback for value 0
}

export function valueToPitch(value: number) {
  const x = valueToPitchRaw(value)

  if (x < 1 && x > -1 && x !== 0) {
    return `${x > 0 ? '+' : ''}${x * 100} cents`
  }

  return `${x > 0 ? '+' : ''}${x}`
}

function createTimeConverter([min, mid, max]: [number, number, number]) {
  const CENTER_VALUE = 32700
  const scale = Math.log2(max / mid) / (65535 - CENTER_VALUE)

  return (value: number): number => {
    const octavesFromCenter = (value - CENTER_VALUE) * scale
    return Math.max(Math.min(mid * Math.pow(2, octavesFromCenter), max), min)
  }
}

export const timeV100 = createTimeConverter([0.02, 1.42, 98.6])
export const timeV1 = createTimeConverter([0.02, 4.50, 999])
export const timeV2 = createTimeConverter([0.02, 6.38, 2000])
export const timeV4 = createTimeConverter([0.02, 9.00, 4000])
export const timeV8 = createTimeConverter([0.02, 12.7, 8000])
export const timeV16 = createTimeConverter([0.02, 18.0, 16000])
