export function displayPercent(value: number) {
  if (value < 10) {
    return Math.floor(value * 1000) / 1000
  }

  if (value < 100) {
    return Math.floor(value * 100) / 100
  }

  return Math.floor(value * 10) / 10
}

export function displayDb(value: number) {
  return Math.floor(value * 100) / 100
}

export function adjustedDb(strength: number): number {
  // Linear dB scale for all values
  return -100 + (strength / 100)
}

export function adjustedPercent(strength: number): number {
  // Always derive percentage from dB value
  const db = -100 + (strength / 100)
  return 100 * Math.pow(10, db / 20)
}
