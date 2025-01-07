export const UINT16_MAX = 65535
const DB_CENTER = 32767

export function adjustedParam(raw: number): number {
  return raw / UINT16_MAX
}

export function convertMidi(value: number): number {
  return Math.floor((value / UINT16_MAX) * 127)
}

export function convertSeconds(value: number) {
  if (value === 0) return 0
  if (value === UINT16_MAX) return Infinity

  const normalized = value / UINT16_MAX

  return normalized // TODO
}

export function convertDb8(value: number) {
  // Range: -8 to +8, with 32767 being 0dB
  const shifted = value - DB_CENTER

  return ((shifted / UINT16_MAX) * 16)
}

export function convertMix(value: number) {
  if (value === 0) return 0
  const normalized = value / UINT16_MAX

  return Math.round(normalized * 100)
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
