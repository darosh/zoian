import debug from 'debug'

const log = debug('zoian:test-compare')

export function compareArrays(original: Uint8Array, written: Uint8Array): boolean {
  let match = true
  let lastDiffOffset = -1
  let lastDiffCount = 0
  const INT_VIEW_SIZE = 4 // Show 16 integers around difference

  const origInts = new Int32Array(original.buffer)
  const writtenInts = new Int32Array(written.buffer)

  // Log total sizes
  log(`Original size: ${original.length}, Written size: ${written.length}`)
  if (original.length !== written.length) {
    log('Size mismatch!')
    match = false
  }

  const length = Math.min(original.length, written.length)

  for (let i = 0; i < length; i++) {
    if (original[i] !== written[i]) {
      match = false

      // Only log if this is a new diff location (skip consecutive diffs)
      if (i > lastDiffOffset + 1) {
        lastDiffCount = 0

        // Show surrounding context as 32-bit integers
        const intOffset = Math.floor(i / 4)
        const start = Math.max(0, intOffset - INT_VIEW_SIZE / 2)
        const end = Math.min(origInts.length, intOffset + INT_VIEW_SIZE / 2)

        log(`\nDifference at byte ${i} (32-bit offset ${intOffset}):`)
        log(`Original: ${original[i]} (0x${original[i].toString(16).padStart(2, '0')})`)
        log(`Written:  ${written[i]} (0x${written[i].toString(16).padStart(2, '0')})`)

        log('\n32-bit Integer Context:')
        log('Offset  | Original      | Written')
        log('--------|---------------|---------------')
        for (let j = start; j < end; j++) {
          const marker = j === intOffset ? '>' : ' '
          const origHex = origInts[j].toString(16).padStart(8, '0')
          const writHex = writtenInts[j].toString(16).padStart(8, '0')
          log(`${marker}${j.toString().padStart(6)} | ${origHex} ${origInts[j].toString().padStart(8)} | ${writHex} ${writtenInts[j].toString().padStart(8)}`)
        }
        log('---')
      }

      lastDiffOffset = i
      lastDiffCount++

      if (lastDiffCount > 100) {
        log('\nToo many differences, truncating output...')
        break
      }
    }
  }

  if (match) {
    log('Arrays match perfectly!')
  }

  return match
}
