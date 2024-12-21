import { convertDir } from './helpers/parse-dir.ts'

Deno.test('convert demo patches', async () => {
  await convertDir('../patches/.bin', '../patches', true)
})
