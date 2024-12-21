import type { Patch } from '../parser/types.ts'

interface CpuRow {
  id: number
  count: number
  cpu: number
  pages: number[]
  pageDisplay: string
  cpuSum: number
}

export function getCpuTable(patch: Patch): CpuRow[] {
  const r = new Map()

  for (const { id, type, cpu, page } of patch.modules) {
    const m = r.has(id) ? r.get(id) : r.set(id, { id, type, cpu, pages: new Set(), count: 0 }).get(id)

    m.count++
    m.pages.add(page)
  }

  return [...r.values()]
    .map((d) => {
      const pages = [...d.pages]

      return {
        ...d,
        pages,
        pagesDisplay: formatPageNumbers([...d.pages]),
        cpuSum: Math.round(d.cpu * d.count * 10) / 10,
      }
    })
    .sort((a, b) => b.cpuSum - a.cpuSum)
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
