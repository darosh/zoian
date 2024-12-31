import debug from 'debug'

import type { Patch, PatchModule } from '../parser/types.ts'
import { MODULES } from '../spec/modules.ts'
import { getOptionEntries } from '../parser/utils/option-entries.ts'
import { LENGTH } from '../spec/const.ts'
import type { Block } from '../spec/types.ts'
import { roundBytesToLongs } from '../parser/utils/round-bytes.ts'

const log = debug('zoian:writer')
const encoder = new TextEncoder()

export function write(patch: Patch): Uint8Array {
  // Create output buffer - always LENGTH bytes
  const buffer = new ArrayBuffer(LENGTH)
  const bytes = new Uint8Array(buffer)
  const longs = new Int32Array(buffer)
  let cursor = 0

  bytes.fill(0)

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
  log('connections', cursor)
  longs[cursor++] = patch.connections.length
  for (const conn of patch.connections) {
    longs[cursor++] = conn.source[0]
    longs[cursor++] = conn.source[1]
    longs[cursor++] = conn.target[0]
    longs[cursor++] = conn.target[1]
    longs[cursor++] = conn.strength
  }

  // Write pages
  let p = patch.pages.slice(patch.euro ? 1 : 0)
  p = p.slice(0, patch.numPages ?? p.length)

  while (patch.numPages && (p.length < patch.numPages)) {
    p.push({ name: '', index: 0 })
  }

  log('pages', cursor, p.length)

  longs[cursor++] = p.length
  for (const page of p) {
    writeString(bytes, cursor * 4, page.name, 16)
    cursor += 4 // 16 bytes = 4 longs
  }

  // Write starred parameters
  log('starred', cursor)
  // cursor++ // Skip one long as per parse.ts

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
  // const colorCursor = <number>patch.size - patch.modules.length
  const colorCursor = <number> patch.size - (patch?.colors?.length ?? 0)
  log('colors', colorCursor)
  // for (let i = 0; i < patch.modules.length; i++) {
  for (let i = 0; i < (patch?.colors?.length ?? 0); i++) {
    // longs[colorCursor + i] = patch.modules[i].color
    longs[colorCursor + i] = patch?.colors?.[i] ?? 0
  }

  return bytes
}

function writeModule(module: PatchModule, longs: Int32Array, bytes: Uint8Array, start: number): number {
  log('writing module', start, module.type)

  // Calculate size: 8 core longs + 2 option longs + paramCount + 4 (name)
  // const size = 8 + 2 + module.parameterCount + 4
  const size = module.size

  let cursor = start

  longs[cursor++] = size
  longs[cursor++] = module.id
  longs[cursor++] = module.version
  longs[cursor++] = module.originalPage ?? module.page
  // longs[cursor++] = module.color || Colors.White
  longs[cursor++] = module?.originalColor ?? 0
  longs[cursor++] = module.originalPosition ?? module.position[0]
  longs[cursor++] = module.parameterCount
  longs[cursor++] = module.dataSize

  // Write options (8 bytes split into two Int32s)
  // log('writing options', cursor, module.optionsList)
  writeOptions(module, bytes, cursor * 4)
  cursor += 2

  log('writing parameters', cursor)
  // Get param blocks sorted by position
  const paramBlocks = Object.entries(module.blocks)
    .filter(([, block]) => block.param)

  const unknownParams: [string, Block][] = Object.entries(module.parameters)
    .filter(([key]) => key.startsWith('param_'))
    .map(([key]) => [key, { position: parseInt(key.replaceAll('param_', '')) }])

  paramBlocks
    .push(...unknownParams)

  paramBlocks
    .sort((a, b) => a[1].position - b[1].position)

  // log('writing parameters', { blocks: paramBlocks, params: module.parameters })

  // Write each param value in position order
  for (let i = 0; i < paramBlocks.length; i++) {
    const [blockName] = paramBlocks[i]
    const value = module.parameters[blockName]

    if (value === undefined) {
      continue
    }

    log('parameter', blockName, value)
    longs[cursor + i] = value
  }

  cursor = start + 10 + module.parameterCount
  log('data bytes', cursor)
  for (let i = 0; i < (module?.dataBytes?.length ?? 0); i++) {
    bytes[cursor * 4 + i] = module?.dataBytes?.[i] ?? 0
  }

  // log('data size', module.dataSize)
  cursor += module.dataSize ? roundBytesToLongs(module.dataSize) : 0

  // Write name (16 bytes = 4 longs)

  if (cursor === (start + size)) {
    return start + size
  }

  log('writing module name', start + size - 4, module.name)
  writeString(bytes, (start + size - 4) * 4, module.name, 16)

  cursor += 4

  if (cursor !== (start + size)) {
    log(cursor, start + size)
    throw `Mismatch`
  }

  return start + size
}

function writeOptions(module: PatchModule, bytes: Uint8Array, offset: number) {
  // Clear 8 bytes
  // bytes.fill(0, offset, offset + 8)

  if (module.optionsList) {
    for (let i = 0; i < module.optionsList.length; i++) {
      bytes[offset + i] = module.optionsList[i]
    }
  } else if (module.optionsBinary) {
    for (const [key, value] of Object.entries(module.optionsBinary)) {
      const entry = getOptionEntries(MODULES[module.id].options)
        .find((e) => e.key === key)

      if (entry) {
        log('entry', { key, value })
        bytes[offset + entry.slot] = value
      }
    }
  } else {
    const entries = getOptionEntries(MODULES[module.id].options)
    for (const entry of entries) {
      const value = module.options[entry.key]
      if (value !== undefined) {
        const valueIndex = entry.values.indexOf(<never> value)
        if (valueIndex !== -1) {
          bytes[offset + entry.slot] = valueIndex
        }
      }
    }
  }
}

function writeString(bytes: Uint8Array, offset: number, str: string, maxLength: number) {
  // Convert string to bytes
  const strBytes = encoder.encode(str || '')

  // Clear the target space
  // bytes.fill(0, offset, offset + maxLength)

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
