import { convertDir } from './helpers/parse-dir.ts'

Deno.test.ignore('parse fixtures', async () => {
  await convertDir('./tests/fixtures', './tests/.output/test')
})

Deno.test.ignore('parse librarian patches', async () => {
  await convertDir(
    '../../../../Library/Application Support/.ZoiaLibraryApp',
    // './tests/.output/librarian'
  )
})
