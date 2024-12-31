import type { PatchModule } from './types.ts'
import type { Block } from '../spec/types.ts'

export function parseParameters(longs: Int32Array, cursor: number): Record<string, number> {
  const params: { [key: string]: number } = {}
  const numParams = longs[cursor + 6]

  for (let i = 0; i < numParams; i++) {
    // params[`param_${i}`] = Math.round(longs[cursor + i + 10] / 65535 * 100) / 100
    params[`param_${i}`] = longs[cursor + i + 10]
  }

  return params
}

export function renameParamDict(module: PatchModule): void {
  const paramBlocks = Object.entries(module.blocks)
    .filter(([, block]: [string, Block]) => block.param)
    .sort((a, b) => a[1].position - b[1].position)

  for (let i = 0; i < paramBlocks.length; i++) {
    // const oldKey = `param_${paramBlocks[i][1].position}`
    const oldKey = `param_${i}`

    if (module.parameters[oldKey] !== undefined) {
      module.parameters[paramBlocks[i][0]] = module.parameters[oldKey]
      // log('moving param: %s to %s', oldKey, paramNames[i])

      delete module.parameters[oldKey]
    }
  }
}
