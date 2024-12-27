import debug from 'debug'

import { type Jack, JackType } from '../spec/types.ts'
import { JACKS_EURO } from '../spec/jacks-euro.ts'
import { EURO_X } from '../spec/const.ts'
import type { PosEuro } from './types.ts'
import { BLOCK_COLORS } from './rgb-colors.ts'
import type { JackView, ModuleView, PatchView } from '../view/types.ts'
import { getIoConnections } from '../view/connections-io.ts'
import { linkJack } from './link-jack.ts'

const log = debug('zoian:euro')

// deno-fmt-ignore
const EURO = [
  0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 93, JACKS_EURO[0], // 1
  0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 94, JACKS_EURO[1], // 2
  0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 95, JACKS_EURO[2], // 3
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 96, JACKS_EURO[3], // 4
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 92, JACKS_EURO[4], // 5
  97, 98, 88, 89, 90, 91, 99, 100, 101, 87, 0, JACKS_EURO[5], // 6
  0, 0, JACKS_EURO[6], JACKS_EURO[7], JACKS_EURO[8], JACKS_EURO[9], // 7 CV in
  JACKS_EURO[10], JACKS_EURO[11], JACKS_EURO[12], JACKS_EURO[13], // 7 CV out
  0, JACKS_EURO[14], // 7
]

export function getEuroGrid(view: PatchView): PosEuro[] {
  const pos = EURO
    .map((v, index) => mapEuro(v, index, view))

  // for (const p of pos) {
  //   if (pos.)
  // }

  return pos
}

function mapEuro(v: number | Jack, index: number, { moduleViews, blockViews }: PatchView): PosEuro {
  const x = index % EURO_X
  const y = (index - x) / EURO_X

  if (v === 0) {
    return {
      pos: 'euro',
      page: 0,
      x,
      y,
      index,
      type: JackType.Blank,
    }
  } else if (v === 1) {
    return {
      pos: 'euro',
      page: 0,
      x,
      y,
      index,
      type: JackType.Button,
    }
  } else if (<number> v > 1) {
    const moduleView = <ModuleView> moduleViews.find((d) => d.module.id === v)

    return {
      pos: 'euro',
      page: 0,
      x,
      y,
      index,
      type: JackType.Button,
      blockView: moduleView?.blockViews?.[0],
      colors: moduleView?.module?.color ? BLOCK_COLORS[moduleView?.module?.color] : undefined,
    }
  } else {
    const connections = getIoConnections(<Jack> v, moduleViews)

    log('connections', connections)

    const o: PosEuro = {
      pos: 'euro',
      page: 0,
      x,
      y,
      index,
      type: (<Jack> v).type,
      jackView: {
        spec: <Jack> v,
        jack: {
          id: (<Jack> v).id,
          euro: true,
          active: connections.length > 0,
        },
        to: [],
        from: [],
      },
    }

    linkJack(connections, <JackView> o.jackView, blockViews)

    return o
  }
}
