import type { Block, Blocks } from '../spec/types.ts'
import type { PatchModule } from './types.ts'
import type { BlockCondition, ModuleSpecConditions, SequentialCondition } from '../spec/types-conditions.ts'

import { MODULES } from '../spec/modules.ts'

export function calculateBlocks(module: PatchModule): Blocks {
  if (!MODULES[module.id].conditions) {
    return { ...MODULES[module.id].blocks }
  }

  return calculateConditionalBlocs(module, <ModuleSpecConditions> MODULES[module.id].conditions)
}

export function calculateConditionalBlocs(module: PatchModule, conditions: ModuleSpecConditions): Record<string, Block> {
  const blocks: Record<string, Block> = {}
  module.blocks = MODULES[module.id].blocks

  // Start with all blocks from the module
  for (const [blockName, block] of Object.entries(module.blocks)) {
    blocks[blockName] = { ...block }
  }

  // Process conditional blocks
  for (const [blockName, condition] of Object.entries(conditions)) {
    const baseBlock = module.blocks[blockName]

    if (!baseBlock) {
      continue // Skip if block doesn't exist in module
    }

    switch (condition.type) {
      case 'sequential': {
        // For sequential blocks, generate all instances
        updateSequentialBlocks(
          condition,
          baseBlock,
          module.options,
          blocks,
          module,
        )

        break
      }

      default: {
        // For all other conditions, evaluate and include/exclude block
        const shouldInclude = evaluateCondition(condition, module.options, module.version)

        if (!shouldInclude) {
          delete blocks[blockName]
        }

        break
      }
    }
  }

  return blocks
}

// Helper function to evaluate a single condition
function evaluateCondition(condition: BlockCondition, options: Record<string, number | string>, version: number): boolean {
  switch (condition.type) {
    case 'toggle':
      return (options[condition.option] === (condition.enableValue ?? 'on')) ||
        (options[condition.option] === 'yes') ||
        (options[condition.option] === 'enabled')

    case 'value':
      return options[condition.option] === condition.value

    case 'range': {
      const value = Number(options[condition.option])
      return (condition.min === undefined || value >= condition.min) &&
        (condition.max === undefined || value <= condition.max)
    }

    case 'multi':
      return condition.operator === 'and' ? condition.conditions.every((c) => evaluateCondition(c, options, version)) : condition.conditions.some((c) => evaluateCondition(c, options, version))

    case 'version':
      if (condition.version[0] === '>=') {
        return version >= condition.version[1]
      }

      return version < condition.version[1]

    case 'sequential':
      // Sequential conditions are handled separately
      return true
  }
}

// Helper function to generate sequential blocks
function updateSequentialBlocks(
  condition: SequentialCondition,
  baseBlock: Block,
  options: Record<string, string | number>,
  blocks: Record<string, Block>,
  module: PatchModule,
): Record<string, Block> {
  const count = (condition.condition && !evaluateCondition(condition.condition, module.options, module.version)) ? 0 : Number(options[condition.option])

  for (let i = 1; i <= count; i++) {
    const blockName = condition.nameTemplate.replace('{n}', i.toString())
    const position = blocks[blockName].position

    blocks[blockName] = {
      ...baseBlock,
      position,
    }
  }

  for (let i = count + 1; i <= 128; i++) {
    const blockName = condition.nameTemplate.replace('{n}', i.toString())

    if (blocks[blockName]) {
      delete blocks[blockName]
    } else {
      break
    }
  }

  return blocks
}
