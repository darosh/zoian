import { MODULES } from '../spec/modules.ts'
import type { Patch } from '../parser/types.ts'
import type { MidiTable } from './types.ts'

const MIDI_CLOCKS = [82, 84]

export function getMidiTable(patch: Patch): MidiTable {
  const rows = []

  for (const m of patch.modules) {
    if ((m.options['midi_channel'] === undefined) && !MIDI_CLOCKS.includes(m.id)) {
      continue
    }

    const input: boolean = !!MODULES[m.id].in

    rows.push({
      input,
      channel: <number> m.options['midi_channel'],
      module: m,
    })
  }

  return {
    input: rows.filter((x) => x.input),
    output: rows.filter((x) => !x.input),
  }
}
