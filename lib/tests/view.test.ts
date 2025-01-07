import debug from 'npm:debug'

import { patches } from '../../patches/patches.ts'
import { getView } from '../view/patch-view.ts'
import { EMPTY_PATCH } from './fixtures/empty-patch.ts'
import { SIMPLE_PATCH } from './fixtures/simple-patch.ts'

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
