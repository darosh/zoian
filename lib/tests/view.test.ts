import debug from 'npm:debug'

import { patches } from '../../patches/patches.ts'
import { patchView } from '../view/patch-view.ts'
import { EMPTY_PATCH } from './fixtures/empty-patch.ts'
import { SIMPLE_PATCH } from './fixtures/simple-patch.ts'

const log = debug('zoian:test')

Deno.test.ignore('views', () => {
  for (const patch of patches) {
    const view = patchView(patch)

    log('view %O', view)

    break
  }
})

Deno.test.ignore('empty', () => {
  const view = patchView(EMPTY_PATCH)
  log('view %O', view)
})

Deno.test.ignore('simple', () => {
  const view = patchView(SIMPLE_PATCH)
  log('view %O', view)
})
