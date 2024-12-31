export function roundBytes(bytes: number) {
  return bytes + 4 - (bytes % 4 || 4)
}

export function roundBytesToLongs(bytes: number) {
  return roundBytes(bytes) / 4
}
