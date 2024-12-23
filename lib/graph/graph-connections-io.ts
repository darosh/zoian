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
      // Used for ios
      if (Number.isInteger(jackModuleOrNumber)) {
        log('numbered module', jackModuleOrNumber)

        const modules = patchModules.filter((v) => v.id === jackModuleOrNumber)

        for (const module of modules) {
          const block = <[string, Block]> blockEntries(module.blocks).at(-1)
          const modulePoint: [number, number] = [module.number, block[1].position]

          log('numbered module connection found')
          connections.push({
            source: jack.input ? jackPoint : modulePoint,
            target: jack.input ? modulePoint : jackPoint,
          })
        }

        continue
      }

      const blockName = <string> (<JackModule> jackModuleOrNumber).block
      const propName = (<JackModule> jackModuleOrNumber).prop
      const value = (<JackModule> jackModuleOrNumber).value

      if (!(propName && value) && !blockName) {
        log('jack not found!')

        continue
      }

      const candidateModules = patchModules.filter((v) => v.id === (<JackModule> jackModuleOrNumber).id)

      // Used for stomp switches
      if (propName && value) {
        log('prop module', jackModuleOrNumber)

        for (const module of candidateModules) {
          const match = module.options[propName] === value

          if (match) {
            const block = <[string, Block]> blockEntries(module.blocks).at(-1)
            const modulePoint: [number, number] = [module.number, block[1].position]

            log('prop module connection found')
            connections.push({
              source: jack.input ? jackPoint : modulePoint,
              target: jack.input ? modulePoint : jackPoint,
            })
          }
        }

        continue
      }

      if (!blockName) {
        log('jack not found!')

        continue
      }

      // Used for non Euro audio modules to IO
      // log('block module', jackModuleOrNumber, candidateModules)

      for (const module of candidateModules) {
        const block = module.blocks[blockName]

        if (block) {
          const modulePoint: [number, number] = [module.number, block.position]

          log('block module connection found')
          connections.push({
            source: jack.input ? jackPoint : modulePoint,
            target: jack.input ? modulePoint : jackPoint,
          })
        }
      }
    }
  }

  return connections
}
