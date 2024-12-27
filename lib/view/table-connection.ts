import debug from 'debug'

import type { Patch } from '../parser/types.ts'
import { blockEntries } from '../parser/utils/block-entries.ts'
import { type ConnectionTable, ConnectionType } from './types.ts'
import type { Block } from '../spec/types.ts'
import { MODULES } from '../spec/modules.ts'

const log = debug('zoian:view-connection-table')

const AUDIO = 'audio'
const CV = 'cv'
const LR = ['L', 'R']

const audios = ['lowpass_out', 'hipass_out', 'bandpass_out', 'fm_input', 'sidechain_in']

export function getConnectionsTable(patch: Patch): ConnectionTable {
  let audio = 0
  let cv = 0
  let mixed = 0
  let unknown = 0
  let missing = 0

  for (const con of patch.connections) {
    const srcM = patch.modules[con.source[0]]
    const srcB = blockEntries(srcM.blocks)
    const tgtM = patch.modules[con.target[0]]
    const tgtB = blockEntries(tgtM.blocks)

    const srcBB = srcB.find((b) => b[1].position === con.source[1])
    const tgtBB = tgtB.find((b) => b[1].position === con.target[1])

    const ct = getConnectionType(srcBB, srcM.id)
    const dt = getConnectionType(tgtBB, tgtM.id)

    if (ct === ConnectionType.Missing || dt === ConnectionType.Missing) {
      log('missing block')
      missing++
    } else if (ct === ConnectionType.Unknown || dt === ConnectionType.Unknown) {
      unknown++
    } else if (ct !== dt) {
      log('mixed %s %s', srcBB?.[0], tgtBB?.[0], con)
      mixed++
    } else if (ct === ConnectionType.CV) {
      cv++
    } else if (ct === ConnectionType.Audio) {
      audio++
    }
  }

  const rows = [
    { type: ConnectionType.Audio, count: audio },
    { type: ConnectionType.CV, count: cv },
    { type: ConnectionType.Unknown, count: unknown },
    { type: ConnectionType.Mixed, count: mixed },
    { type: ConnectionType.Missing, count: missing },
  ].filter((x) => x.count)

  return {
    counts: {
      audio,
      cv,
      mixed,
      unknown,
      missing,
    },
    rows,
    total: audio + cv + mixed + unknown + missing,
  }
}

function words(text: string) {
  return text.split('_')
}

export function getConnectionType(blockEntry: [string, Block] | undefined, id: number): ConnectionType {
  if (!blockEntry) {
    return ConnectionType.Missing
  }

  const ws = words(blockEntry[0])

  if (ws.includes(AUDIO)) {
    return ConnectionType.Audio
  }

  if (ws.includes(CV)) {
    return ConnectionType.CV
  }

  if (LR.includes(<string> ws.at(-1))) {
    return ConnectionType.Audio
  }

  if (audios.includes(blockEntry[0])) {
    return ConnectionType.Audio
  }

  if (MODULES[id].category === 'CV') {
    return ConnectionType.CV
  }

  // return ConnectionType.Unknown
  return ConnectionType.CV
}
