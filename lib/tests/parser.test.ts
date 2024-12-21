import { convertDir } from './helpers/parse-dir.ts'

Deno.test('parse fixtures', async () => {
  await convertDir('./tests/fixtures', './tests/.output/test')
})

Deno.test('parse librarian patches', async () => {
  await convertDir(
    '../../../../Library/Application Support/.ZoiaLibraryApp',
    // './tests/.output/librarian'
  )
})
