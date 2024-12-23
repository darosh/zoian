import debug from 'npm:debug'

import { patches } from '../../patches/patches.ts'
import { patchView } from '../graph/patch-view.ts'

const log = debug('zoian:test')

Deno.test.ignore('views', async () => {
  for (const patch of patches) {
    const view = patchView(patch)

    log('view %O', view.orphanConnections)
  }
})
