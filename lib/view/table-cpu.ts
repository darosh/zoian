import type { Patch } from '../parser/types.ts'
import type { CpuTable } from './types.ts'
import { MODULES } from '../spec/modules.ts'

export function getCpuTable(patch: Patch): CpuTable {
  const r = new Map()
  let sum = 0

  for (const { id, type, page } of patch.modules) {
    const cpu = MODULES[id].cpu
    const m = r.has(id) ? r.get(id) : r.set(id, { id, type, cpu, pages: new Set(), count: 0 }).get(id)

    sum += cpu
    m.count++
    m.pages.add(page)
  }

  return {
    sum: Math.round(sum * 10) / 10,
    rows: [
      ...r.values(),
    ]
      .map((d) => {
        const pages = [...d.pages]

        return {
          ...d,
          pages,
          pagesDisplay: formatPageNumbers([...d.pages]),
          cpuSum: Math.round(d.cpu * d.count * 10) / 10,
        }
      })
      .sort((a, b) => b.cpuSum - a.cpuSum),
  }
}

function formatPageNumbers(pages: number[]) {
  if (!pages.length) return ''

  const ranges = []
  let rangeStart = pages[0]
  let prev = pages[0]

  if (pages[0] === -1) {
    ranges.push('Euroburo')
    pages.shift()
  }

  for (let i = 1; i <= pages.length; i++) {
    if (pages[i] !== prev + 1) {
      if ((rangeStart + 1) === prev) {
        ranges.push(rangeStart)
        ranges.push(prev)
      } else {
        ranges.push(rangeStart === prev ? rangeStart : `${rangeStart}–${prev}`)
      }
      rangeStart = pages[i]
    }

    prev = pages[i]
  }

  return ranges.join(', ')
}
