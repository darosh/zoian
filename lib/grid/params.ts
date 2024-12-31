export function adjustedParam(raw: number) {
  return raw / 65535
}

export function displayParam(value: number) {
  return Math.round(value * 100) / 100
}

const UINT16_MAX = 65535;
const DB_CENTER = 32767;

export function convertSeconds(value: number) {
  // Range: 4.02 to inf
  if (value === 0) return 4.02;
  const normalized = value / UINT16_MAX;
  return Number((normalized * (100 - 4.02) + 4.02).toFixed(2));
}

export function convertDb(value: number) {
  // Range: -8 to +8, with 32767 being 0dB
  const shifted = value - DB_CENTER;
  return Number(((shifted / UINT16_MAX) * 16).toFixed(1));
}

export function convertMix(value: number) {
  // Range: 36 to 100
  if (value === 0) return 36;
  const normalized = value / UINT16_MAX;
  return Math.round(normalized * (100 - 36) + 36);
}
