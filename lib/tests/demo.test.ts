import { convertDir } from './helpers/parse-dir.ts'

Deno.test.ignore('convert demo patches', async () => {
  await convertDir('../patches/.bin', '../patches', true)
})
