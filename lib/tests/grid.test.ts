import debug from 'npm:debug'

import { patchView } from '../view/patch-view.ts'
import { EMPTY_PATCH } from './fixtures/empty-patch.ts'
import { SIMPLE_PATCH } from './fixtures/simple-patch.ts'
import { gridView } from '../grid/grid-view.ts'

const log = debug('zoian:test')

Deno.test.ignore('empty', () => {
  const view = patchView(EMPTY_PATCH)
  const grid = gridView(view)

  log('view %O', grid)
})

Deno.test('simple', () => {
  const view = patchView(SIMPLE_PATCH)
  const grid = gridView(view)

  log('view %O', grid)
})
