import debug from 'debug'

import type { Block, Jack, JackModule } from '../spec/types.ts'
import { blockEntries } from '../parser/utils/block-entries.ts'
import type { IoConnection, ModuleView } from './types.ts'

const log = debug('zoian:io')

export function graphJackConnections(jack: Jack, viewModules: ModuleView[]): IoConnection[] {
  const jackPoint: [string] = [jack.id]
  const connections: IoConnection[] = []

  for (const jackModuleOrNumber of jack.modules) {
    // Used for ios
    if (Number.isInteger(jackModuleOrNumber)) {
      log('numbered module', jackModuleOrNumber)

      const modules = viewModules.filter((v) => v.module?.id === jackModuleOrNumber)

      for (const module of modules) {
        const block = <[string, Block]> blockEntries(module.module.blocks).at(-1)
        const modulePoint: [number, number] = [module.module.number, block[1].position]

        log('numbered module connection found')
        connections.push({
          source: !jack.input ? jackPoint : modulePoint,
          target: !jack.input ? modulePoint : jackPoint,
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

    const candidateModules = viewModules.filter((v) => v.module?.id === (<JackModule> jackModuleOrNumber).id)

    // Used for stomp switches
    if (propName && value) {
      log('prop module', jackModuleOrNumber)

      for (const module of candidateModules) {
        const match = module.module.options[propName] === value

        if (match) {
          const block = <[string, Block]> blockEntries(module.module.blocks).at(-1)
          const modulePoint: [number, number] = [module.module.number, block[1].position]

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
      const block = module.module.blocks[blockName]

      if (block) {
        const modulePoint: [number, number] = [module.module.number, block.position]

        log('block module connection found')
        connections.push({
          source: jack.input ? jackPoint : modulePoint,
          target: jack.input ? modulePoint : jackPoint,
        })
      }
    }
  }

  return connections
}
