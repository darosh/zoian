import type { Options, OptionsRange } from '../../spec/types.ts'

interface OptionEntry {
  key: string
  slot: number
  values: string[] | number[]
}

const cache = new WeakMap()

export function getOptionEntries(options: Options): OptionEntry[] {
  if (cache.has(options)) {
    return cache.get(options)
  }

  const entries = Object.entries(options)
    .map(([key, v]) => {
      return {
        key,
        slot: v.slot,
        values: Array.isArray(v.values) ? v.values : getOptionValues(v.values),
      }
    })
    .sort((a, b) => a.slot - b.slot)

  cache.set(options, entries)

  return entries
}

function getOptionValues(v: OptionsRange) {
  const sign = ((<{ min: number }> v)?.min > (<{ max: number }> v)?.max) ? -1 : 1

  return Array.from({ length: Math.abs(v.max - v.min + 1) }).map((_v, i) => v.min + i * sign)
}
