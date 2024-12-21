import { type Jack, JackType } from './types.ts'

export const JACKS_IO: Jack[] = [
  {
    id: 'io-cp-out',
    type: JackType.CPort,
    text: 'C',
    title: 'CPort CV Out',
    modules: [55],
  },
  {
    id: 'io-cp-in',
    type: JackType.CPort,
    text: 'C',
    title: 'CPort In',
    input: true,
    modules: [54],
  },
  {
    id: 'io-st-x',
    type: JackType.Stomp,
    text: 'X',
    title: 'External Stompswitch',
    input: true,
    modules: [{
      id: 44,
      prop: 'stompswitch',
      value: 'ext',
    }],
  },
  {
    id: 'io-midi-out',
    type: JackType.Midi,
    title: 'Midi Out',
    modules: [60, 61, 62, 84],
  },
  {
    id: 'io-midi-in',
    type: JackType.Midi,
    title: 'Midi In',
    input: true,
    modules: [20, 21, 35, 82, 86],
  },
  {
    id: 'io-out-r',
    type: JackType.Audio,
    text: 'R',
    title: 'Audio Out R',
    modules: [{
      id: 2,
      block: 'input_R',
    }, 96],
  },
  {
    id: 'io-out-l',
    type: JackType.Audio,
    text: 'L',
    title: 'Audio Out L',
    modules: [{
      id: 2,
      block: 'input_L',
    }, 95],
  },
  {
    id: 'io-in-l',
    type: JackType.Audio,
    text: 'R',
    title: 'Audio In R',
    input: true,
    modules: [{
      id: 1,
      block: 'output_R',
    }, 94],
  },
  {
    id: 'io-in-r',
    type: JackType.Audio,
    text: 'L',
    title: 'Audio In L',
    input: true,
    modules: [{
      id: 1,
      block: 'output_L',
    }, 93],
  },
  {
    id: 'io-st-1',
    type: JackType.Stomp,
    text: '1',
    title: 'Left Stompswitch',
    input: true,
    modules: [{
      id: 44,
      prop: 'stompswitch',
      value: 'left',
    }],
  },
  {
    id: 'io-st-2',
    type: JackType.Stomp,
    text: '2',
    title: 'Middle Stompswitch',
    input: true,
    modules: [{
      id: 44,
      prop: 'stompswitch',
      value: 'middle',
    }],
  },
  {
    id: 'io-st-3',
    type: JackType.Stomp,
    text: '3',
    title: 'Right Stompswitch',
    input: true,
    modules: [{
      id: 44,
      prop: 'stompswitch',
      value: 'right',
    }],
  },
]
