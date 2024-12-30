import debug from 'npm:debug'
import { assertEquals } from 'jsr:@std/assert'

import { convertDir } from './helpers/parse-dir.ts'
import { write } from '../writer/write.ts'
import { parse } from '../parser/parse.ts'
import stringify from 'npm:json-stringify-pretty-compact@4.0.0'

const log = debug('zoian:test')

Deno.test('writer', async () => {
  const r = await convertDir('./tests/fixtures', './tests/.output/test')

  for (const { parsed, name } of r) {
    const written = write(parsed)
    const reparsed = parse(written)

    await Deno.writeTextFile(`${name}.json`, stringify(reparsed, { maxLength: 640 }))

    log('reparsed: %s, parsed: %s', JSON.stringify(reparsed).length, JSON.stringify(parsed).length)


    // assertEquals(reparsed, parsed)
  }
})
