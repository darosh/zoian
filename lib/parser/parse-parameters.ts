import type { PatchModule } from './types.ts'
import type { Block } from '../spec/types.ts'

export function parseParameters(longs: Int32Array, cursor: number): Record<string, number> {
  const params: { [key: string]: number } = {}
  const numParams = longs[cursor + 6]

  for (let i = 0; i < numParams; i++) {
    params[`param_${i}`] = Math.round(longs[cursor + i + 10] / 65535 * 100) / 100
  }

  return params
}

export function renameParamDict(module: PatchModule): void {
  const paramBlocks = Object.entries(module.blocks)
    .filter(([, block]: [string, Block]) => block.param)
    .reduce((acc: { [key: string]: boolean }, [key]) => {
      acc[key] = true
      return acc
    }, {})

  const paramNames = Object.keys(paramBlocks)

  for (let i = 0; i < paramNames.length; i++) {
    const oldKey = `param_${i}`

    if (module.parameters[oldKey] !== undefined) {
      module.parameters[paramNames[i]] = module.parameters[oldKey]
      // log('moving param: %s to %s', oldKey, paramNames[i])

      delete module.parameters[oldKey]
    }
  }
}
