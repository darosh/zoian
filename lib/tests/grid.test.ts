import debug from 'npm:debug'

import { getView } from '../view/patch-view.ts'
import { EMPTY_PATCH } from './fixtures/empty-patch.ts'
import { SIMPLE_PATCH } from './fixtures/simple-patch.ts'
import { getGrid } from '../grid/grid.ts'

const log = debug('zoian:test')

Deno.test.ignore('empty', () => {
  const view = getView(EMPTY_PATCH)
  const grid = getGrid(view)

  log('view %O', grid)
})

Deno.test('simple', () => {
  const view = getView(SIMPLE_PATCH)
  const grid = getGrid(view)

  log('view %O', grid)
})
