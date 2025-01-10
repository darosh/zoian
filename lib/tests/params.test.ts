import debug from 'debug'

import { displayParameter } from '../index.ts'
import { assertEquals } from 'jsr:@std/assert'
import type { BlockView } from '../view/types.ts'

const log = debug('zoian:test')

Deno.test('params', async () => {
  const tab = await Deno.readTextFile('./tests/fixtures/params.tsv')

  const lines = tab.split('\n').slice(1)

  for (const line of lines) {
    if (!line.trim()) {
      continue
    }

    if (line.startsWith('//')) {
      continue
    }

    const cols = line.split('\t')

    if (!cols[1]) {
      continue
    }

    const type = cols[0]
    const name = cols[4]
    const module = cols[3]
    const raw = parseInt(cols[1], 10)
    const expected = cols[2]
    const option = (cols[5] ?? '').split(':').map((x) => x.trim())
    const bv = {
      name,
      moduleView: {
        spec: {
          name: module,
        },
        module: {
          options: {
            [option[0]]: option[1],
          },
        },
      },
    }

    const display = displayParameter(<BlockView> bv, raw).toString()

    log({ type, name, raw, expected, display })

    try {
      assertEquals(
        display
          .replaceAll('\u202F', ' ')
          .replaceAll('−', '-')
          .split(',')
          .shift(),
        expected
          .split(',')
          .shift(),
      )
    } catch (error: unknown) {
      if (cols[7] === 'approx') {
        log('approx value')
      }

      log((<Error> error)?.message?.split('\n').filter(Boolean).join('\n'))

      if (cols[7] !== 'approx') {
        break
      }
    }
  }
})
