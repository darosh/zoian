import { MODULES } from '../spec/modules.ts'
import stringify from 'json-stringify-pretty-compact'

Deno.test.ignore('list block names', async () => {
  const list = MODULES.reduce((acc, m) => {
    Object.entries(m.blocks).forEach(([k, block]) => {
      acc[k] = acc[k] || { modules: [], param: [] }
      acc[k].modules.push(m.name)
      acc[k].param.push(block?.param ?? false)
    })

    return acc
  }, {} as Record<string, { modules: [string]; param: [boolean] }>)

  const arr = Object.entries(list)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([k, v]) => ({ name: k, ...v }))
    .map((d) => ({
      ...d,
      param: d.param.every((v) => v === true) ? true : d.param.every((v) => v === false) ? undefined : d.param,
    }))

  await Deno.writeTextFile('./tests/.output/blocks.json', stringify(arr, { maxLength: 640 }))
})