import debug from 'npm:debug'

import { patches } from '../../patches/patches.ts'
import { getView } from '../view/patch-view.ts'
import { EMPTY_PATCH } from './fixtures/empty-patch.ts'
import { SIMPLE_PATCH } from './fixtures/simple-patch.ts'
import { MODULES } from '../spec/modules.ts'
import { blockEntries } from '../parser/utils/block-entries.ts'
import { getParamType, ParamType } from '../grid/param-types.ts'
import stringify from 'json-stringify-pretty-compact'

const log = debug('zoian:test')

Deno.test.ignore('views', () => {
  for (const patch of patches) {
    const view = getView(patch)

    log('view %O', view)

    break
  }
})

Deno.test.ignore('empty', () => {
  const view = getView(EMPTY_PATCH)
  log('view %O', view)
})

Deno.test.ignore('simple', () => {
  const view = getView(SIMPLE_PATCH)
  log('view %O', view)
})

Deno.test.ignore('params', () => {
  const b = MODULES.reduce((acc, m) => {
    blockEntries(m.blocks).forEach(([key, block]) => {
      const name = key.replace(/_\d+$/, '')

      if (block.param) {
        acc[name] = acc[name] || []

        if (acc[name].some((set) => set.modules.includes(m.name))) {
          return
        }

        const type = 'ParamType.' + ParamType[getParamType(key, m)]

        let s = acc[name].find((set) => set.type === type)

        if (!s) {
          s = { type, modules: [] }
          acc[name].push(s)
        }

        s.modules.push(m.name)
      }
    })

    return acc
  }, <Record<string, { modules: string[]; type: string }[]>> {})

  console.log(stringify(b, { maxLength: 640 }))
})
