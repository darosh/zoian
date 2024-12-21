import debug from 'debug'

import type { Block, Jack, JackModule } from '../spec/types.ts'
import type { PatchModule } from '../parser/types.ts'
import { blockEntries } from '../parser/utils/block-entries.ts'
import type { IoConnection } from './types.ts'

const log = debug('zoian:graph:io')

export function graphIoConnections(JACKS: Jack[], patchModules: PatchModule[]): IoConnection[] {
  const connections: IoConnection[] = []

  for (const jack of JACKS) {
    log('jack %o', jack)
    const jackPoint: [string] = [jack.id]

    for (const jackModuleOrNumber of jack.modules) {
      if (Number.isInteger(jackModuleOrNumber)) {
        log('numbered module', jackModuleOrNumber)

        const modules = patchModules.filter((v) => v.id === jackModuleOrNumber)

        for (const module of modules) {
          const block = <[string, Block]> blockEntries(module.blocks).at(-1)
          const modulePoint: [number, number] = [module.number, block[1].position]

          log('connection found')
          connections.push({
            source: jack.input ? modulePoint : jackPoint,
            target: jack.input ? jackPoint : modulePoint,
          })
        }

        continue
      }

      const candidateModules = patchModules.filter((v) => v.id === (<JackModule> jackModuleOrNumber).id)

      if ((<JackModule> jackModuleOrNumber).prop && (<JackModule> jackModuleOrNumber).value) {
        log('prop module', jackModuleOrNumber)

        for (const module of candidateModules) {
          const match = module.options[<string> (<JackModule> jackModuleOrNumber).prop] === (<JackModule> jackModuleOrNumber).value

          if (match) {
            const block = <[string, Block]> blockEntries(module.blocks).at(-1)
            const modulePoint: [number, number] = [module.number, block[1].position]

            log('connection found')
            connections.push({
              source: jack.input ? modulePoint : jackPoint,
              target: jack.input ? jackPoint : modulePoint,
            })
          }
        }

        continue
      }

      log('block module', jackModuleOrNumber, candidateModules)

      for (const module of candidateModules) {
        const block = module.blocks[<string> (<JackModule> jackModuleOrNumber).block]

        if (block) {
          const modulePoint: [number, number] = [module.number, block.position]

          log('connection found')
          connections.push({
            source: jack.input ? modulePoint : jackPoint,
            target: jack.input ? jackPoint : modulePoint,
          })
        }
      }
    }
  }

  return connections
}
