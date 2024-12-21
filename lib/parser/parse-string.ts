const decoder = new TextDecoder()

export function parseString(bytes: Uint8Array): string {
  // Find the first null terminator
  let endIndex = bytes.indexOf(0)

  if (endIndex === -1) {
    endIndex = bytes.length
  }

  // Convert only up to the null terminator and trim any whitespace
  const name = decoder.decode(bytes.subarray(0, endIndex)).trim()

  // Handle any 'b"' prefix that might exist
  return name
    .replace(/^b"/, '')
    .replace(/"$/, '')
}
