import debug from 'debug'

import type { Connection, Patch, PatchModule } from './types.ts'

import { MODULES } from '../spec/modules.ts'
import { G, LENGTH } from '../spec/const.ts'

import { parseString } from './parse-string.ts'
import { parsePages } from './parse-pages.ts'
import { parseParameters, renameParamDict } from './parse-parameters.ts'

import { calculateBlocks } from './calculate-block.ts'
import { calculatePages } from './calculate-pages.ts'
import { calculatePositions } from './calculate-positions.ts'

import { getOptionEntries } from './utils/option-entries.ts'
import { Colors } from '../spec/colors.ts'

const log = debug('zoian:parser')

export function parse(bytes: Uint8Array, includeBinary: boolean = false): Patch {
  log('parsing buffer %s', bytes.length)
  log('first byte %s', bytes[0])

  const name = parseString(bytes.subarray(4))

  log('name', name)
  log('length', bytes.length)
  log('byteLength', bytes.buffer.byteLength)

  const longs = new Int32Array(bytes.buffer)
  const patchSize = longs[0]
  log('patch size', patchSize)

  if (patchSize > LENGTH) {
    throw new Error(`Patch is too large! [${patchSize}]`)
  }

  // Get module colors from end of binary
  const lastNonZero = longs.reduce((acc, val, idx) => val !== 0 ? idx : acc, 0)
  log('last non zero', lastNonZero)
  const lastColor = lastNonZero + 1
  const firstColor = lastColor - longs[5]

  let colors: number[] = []
  let skipReal = false

  for (let j = firstColor; j < lastColor; j++) {
    if (longs[j] > 15) {
      skipReal = true
      colors = []
      break
    }

    colors.push(longs[j])
  }

  log('colors %s', colors.length)

  // Parse modules
  log('parsing modules')
  const modules: PatchModule[] = []
  const numModules = longs[5]
  log('modules %s', numModules)

  let cursor = 6

  for (let i = 0; i < numModules; i++) {
    const size = longs[cursor]
    const moduleId = longs[cursor + 1]
    const old_color = longs[cursor + 4]
    const new_color = skipReal ? '' : (colors[i] || Colors.White)
    const optionEntries = getOptionEntries(MODULES[moduleId].options)
    const options_list = [
      ...Array.from(bytes.subarray((cursor + 8) * 4, (cursor + 8) * 4 + 4)),
      ...Array.from(bytes.subarray((cursor + 9) * 4, (cursor + 9) * 4 + 4)),
    ]

    const module: PatchModule = {
      number: i,
      id: moduleId,
      type: MODULES[moduleId].name,
      name: parseString(bytes.subarray(
        (cursor + (size - 4)) * 4,
        (cursor + (size - 4)) * 4 + 16,
      )),
      version: longs[cursor + 2],
      euro: MODULES[moduleId].euro,
      size: longs[cursor],
      dataSize: longs[cursor + 7],
      page: longs[cursor + 3],
      color: new_color === '' ? old_color || Colors.White : new_color,
      options: {},
      parameterCount: longs[cursor + 6],
      parameters: parseParameters(longs, cursor),
      blocks: {},
      position: [longs[cursor + 5]],
    }

    if (includeBinary) {
      module.optionsBinary = {}
      module.optionsList = options_list
    }

    // Process module options
    try {
      for (const { key, values, slot } of optionEntries) {
        const optionBinary = options_list[slot]
        const optionValue = values[optionBinary]
        module.options[key] = optionValue

        if (module.optionsBinary) {
          module.optionsBinary[key] = optionBinary
        }
      }
    } catch {
      throw new Error('Invalid option data!')
    }

    modules.push(module)
    cursor += size
  }

  // Parse connections
  const connections: Connection[] = []
  const numConnections = longs[cursor]

  for (let j = 0; j < numConnections; j++) {
    connections.push({
      source: [longs[cursor + 1], longs[cursor + 2]],
      target: [longs[cursor + 3], longs[cursor + 4]],
      strength: Math.round(longs[cursor + 5] / 100),
    })

    cursor += 5
  }

  cursor++

  // Process additional module data
  for (const module of modules) {
    module.blocks = calculateBlocks(module)
    module.position = calculatePositions(module.position[0], Object.entries(module.blocks).length)

    if (module.position[0] >= G) {
      module.position = module.position.map((v) => v - G)
      module.page++
      module.page = module.page > 127 ? 127 - module.page : module.page
    }

    if (module.euro) {
      log('euro module on page', module.page)
      module.page = module.page >= 127 ? -1 : module.page
    }
  }

  const euro = modules.some((m) => m.euro)
  const range = calculatePages(modules)
  log('pages %o', range)
  const numPages = longs[cursor]
  log('stored pages %s', numPages)
  const pageNames = parsePages(bytes, cursor, numPages)

  while (pageNames.length && !pageNames.at(-1)) {
    pageNames.pop()
  }

  // Fill remaining slots with empty strings if needed
  while (pageNames.length < (range.last + 1)) {
    pageNames.push('')
  }

  let pages = pageNames.map((name, index) => ({ name, index }))

  if (euro) {
    pages = [{ name: '', index: -1 }, ...pages]
  }

  cursor += numPages * 4

  // Parse starred parameters
  const starred = []
  cursor++
  const numStarred = longs[cursor]
  log('starred count: %s', numStarred)

  for (let l = 0; l < numStarred; l++) {
    const subBytes = new DataView(bytes.buffer, (cursor + 1) * 4, 4)

    const byte2 = [
      subBytes.getInt16(0, true),
      subBytes.getInt16(2, true),
    ]

    starred.push({
      module: byte2[0],
      block: byte2[1] % 128,
      cc: byte2[1] >= 128 ? Math.round(byte2[1] / 128) - 1 : undefined,
    })

    cursor++
  }

  for (const module of modules) {
    renameParamDict(module)
  }

  return {
    name,
    size: patchSize,
    euro,
    pages,
    modules,
    connections,
    starred,
  }
}
