// deno-lint-ignore-file no-control-regex
export function parsePages(bytes: Uint8Array, cursor: number, numPages: number): string[] {
  const pages: string[] = []
  let offset = (cursor + 1) * 4

  // Read each page name
  for (let k = 0; k < numPages; k++) {
    // Read full 16-byte chunk for page name
    const pageNameBytes = bytes.subarray(offset, offset + 16)

    // Convert to string and clean up
    const pageName = readNullTerminatedString(pageNameBytes, 0, 16)
    pages.push(pageName)

    // Move to next page name (4 x 32-bit words = 16 bytes)
    offset += 16
  }

  return pages
}

const decoder = new TextDecoder()

function readNullTerminatedString(bytes: Uint8Array, offset: number, maxLength: number): string {
  // Read until null terminator or max length
  let endIndex = offset

  while (endIndex < offset + maxLength && bytes[endIndex] !== 0) {
    endIndex++
  }

  // Convert to string and clean up
  return decoder.decode(bytes.subarray(offset, endIndex))
    .trim()
    .replace(/\u0000/g, '') // Remove any null chars
    .replace(/[\x00-\x1F\x7F-\x9F]/g, '') // Remove control chars
}
