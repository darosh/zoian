import type { Patch, PatchModule } from '../parser/types.ts'
import { MODULES } from '../spec/modules.ts'
import { getOptionEntries } from '../parser/utils/option-entries.ts'
import { LENGTH } from '../spec/const.ts'

const encoder = new TextEncoder()

export function write(patch: Patch): Uint8Array {
  // Create output buffer - always LENGTH bytes
  const buffer = new ArrayBuffer(LENGTH)
  const bytes = new Uint8Array(buffer)
  const longs = new Int32Array(buffer)
  let cursor = 0

  // Write header
  longs[cursor++] = patch.size || calculatePatchSize(patch)

  // Write name at offset 4 bytes (after first long)
  writeString(bytes, 4, patch.name || '', LENGTH - 4) // Use remaining buffer length as max

  // Skip to offset 5 for number of modules
  cursor = 5
  longs[cursor++] = patch.modules.length

  // Write modules
  for (const module of patch.modules) {
    cursor = writeModule(module, longs, bytes, cursor)
  }

  // Write connections
  longs[cursor++] = patch.connections.length
  for (const conn of patch.connections) {
    longs[cursor++] = conn.source[0]
    longs[cursor++] = conn.source[1]
    longs[cursor++] = conn.target[0]
    longs[cursor++] = conn.target[1]
    longs[cursor++] = conn.strength
  }

  // Write pages
  longs[cursor++] = patch.pages.length - (patch.euro ? 1 : 0) // Subtract 1 if euro since first page is empty
  for (const page of patch.pages) {
    if (patch.euro && page.index === -1) continue // Skip euro empty page
    writeString(bytes, cursor * 4, page.name, 16)
    cursor += 4 // 16 bytes = 4 longs
  }

  // Write starred parameters
  cursor++ // Skip one long as per parse.ts
  longs[cursor++] = patch.starred.length
  for (const star of patch.starred) {
    // Write as two 16-bit values in one 32-bit slot
    const value = star.block + (star.cc ? (star.cc + 1) * 128 : 0)
    const view = new DataView(buffer, cursor * 4, 4)
    view.setInt16(0, star.module, true) // true = little endian
    view.setInt16(2, value, true)
    cursor++
  }

  // Write colors at the end
  const colorCursor = cursor + 1
  for (let i = 0; i < patch.modules.length; i++) {
    longs[colorCursor + i] = patch.modules[i].color
  }

  return bytes
}

function writeModule(module: PatchModule, longs: Int32Array, bytes: Uint8Array, cursor: number): number {
  // Calculate size: 8 core longs + 2 option longs + paramCount + 4 (name)
  const size = 8 + 2 + module.parameterCount + 4

  longs[cursor++] = size
  longs[cursor++] = module.id
  longs[cursor++] = module.version
  longs[cursor++] = module.page
  longs[cursor++] = module.color || 0
  longs[cursor++] = module.position[0]
  longs[cursor++] = module.parameterCount
  longs[cursor++] = module.dataSize

  // Write options (8 bytes split into two Int32s)
  writeOptions(module, bytes, cursor * 4)
  cursor += 2

  // Write parameters (scaled to 16-bit range)
  const paramNames = Object.keys(module.parameters).sort()
  for (const paramName of paramNames) {
    const value = module.parameters[paramName]
    longs[cursor++] = Math.round(value * 65535 / 100)
  }

  // Write name (16 bytes = 4 longs)
  writeString(bytes, cursor * 4, module.name, 16)
  cursor += 4

  return cursor
}

function writeOptions(module: PatchModule, bytes: Uint8Array, offset: number) {
  // Clear 8 bytes
  bytes.fill(0, offset, offset + 8)

  // If we have optionsBinary values, write them directly
  if (module.optionsBinary) {
    for (const [key, value] of Object.entries(module.optionsBinary)) {
      const optionEntry = getOptionEntries(MODULES[module.id].options)
        .find(entry => entry.key === key)
      if (optionEntry) {
        bytes[offset + optionEntry.slot] = value
      }
    }
  } else {
    // Convert option values back to binary using module spec
    const optionEntries = getOptionEntries(MODULES[module.id].options)
    for (const entry of optionEntries) {
      const currentValue = module.options[entry.key]
      if (currentValue !== undefined) {
        // Find index of value in values array
        const valueIndex = entry.values.indexOf(<never>currentValue)
        if (valueIndex !== -1) {
          bytes[offset + entry.slot] = valueIndex
        } else if (typeof currentValue === 'number') {
          // Handle numeric range options
          const min = Math.min(...entry.values as number[])
          const value = Number(currentValue) - min
          bytes[offset + entry.slot] = value
        }
      }
    }
  }
}

function writeString(bytes: Uint8Array, offset: number, str: string, maxLength: number) {
  // Convert string to bytes
  const strBytes = encoder.encode(str || '')

  // Clear the target space
  bytes.fill(0, offset, offset + maxLength)

  // Copy string bytes up to maxLength
  bytes.set(strBytes.subarray(0, maxLength), offset)

  // Ensure null termination
  if (strBytes.length < maxLength) {
    bytes[offset + strBytes.length] = 0
  }
}

function calculatePatchSize(patch: Patch): number {
  // Calculate total size in 32-bit words
  let size = 6 // Header

  // Add module sizes
  for (const module of patch.modules) {
    size += 8 + 2 + module.parameterCount + 4
  }

  // Add connections size
  size += 1 + (patch.connections.length * 5)

  // Add pages size
  const numPages = patch.pages.length - (patch.euro ? 1 : 0)
  size += 1 + (numPages * 4)

  // Add starred params size
  size += 2 + patch.starred.length

  // Add colors size
  size += patch.modules.length + 1

  return size * 4 // Convert to bytes
}
