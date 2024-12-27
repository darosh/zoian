import type { Patch } from '../../parser/types.ts'

export const SIMPLE_PATCH: Patch = {
  size: 1,
  euro: true,
  name: 'Simple Patch',
  starred: [],
  pages: [{ name: '', index: -1 }, { name: 'ctrl-snd source', index: 0 }, { name: 'gate brain', index: 1 }, { name: 'note brain', index: 2 }, { name: 'fm brain', index: 3 }, { name: 'perc brain', index: 4 }, { name: 'fx mix', index: 5 }, { name: 'amajor lonepoly', index: 6 }, { name: 'bass seq', index: 7 }, { name: 'Benn Jordan', index: 8 }],
  modules: [
    { number: 0, id: 93, type: 'Euro Audio Input 1', name: '', version: 0, euro: true, size: 14, dataSize: 0, page: -1, color: 2, options: { input_pad: '6dB' }, parameterCount: 0, parameters: {}, blocks: { output: { initial: true, position: 0 } }, position: [14] },
    { number: 1, id: 95, type: 'Euro Audio Output 1', name: '', version: 0, euro: true, size: 14, dataSize: 0, page: -1, color: 2, options: {}, parameterCount: 0, parameters: {}, blocks: { input: { initial: true, position: 0 } }, position: [16] },
  ],
  connections: [
    { source: [0, 0], target: [1, 0], strength: 100 },
  ],
}
