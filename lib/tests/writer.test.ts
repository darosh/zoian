import debug from 'npm:debug'
import { assertEquals } from 'jsr:@std/assert'

import { convertDir } from './helpers/parse-dir.ts'
import { write } from '../writer/write.ts'
import { parse } from '../parser/parse.ts'
import stringify from 'npm:json-stringify-pretty-compact@4.0.0'
import { compareArrays } from './helpers/compare-arrays.ts'

const log = debug('zoian:test')

Deno.test.ignore('writer', async () => {
  // const r = await convertDir('./tests/fixtures', './tests/.output/test', false, true)
  const r = await convertDir('../patches/.bin', './tests/.output/patches', false, true)
  // const r = await convertDir('../../../../Library/Application Support/.ZoiaLibraryApp', './tests/.output/lib', false, true)

  for (const { parsed, name, data } of r) {
    if (parsed.size === 0) {
      continue
    }

    const written = write(parsed)
    const reparsed = parse(written, true)

    await Deno.writeTextFile(`${name}.json`, stringify(reparsed, { maxLength: 640 }))

    log(name)
    log('reparsed: %s, parsed: %s', JSON.stringify(reparsed).length, JSON.stringify(parsed).length)
    const match = compareArrays(data, written)

    if (!match) {
      throw 'No match!'
    }

    assertEquals(reparsed, parsed)
  }
})
