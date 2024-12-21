import { type Jack, JackType } from './types.ts'

export const JACKS_ZEBU: Jack[] = [
  {
    id: 'eu-in-l',
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
    id: 'eu-in-R',
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
    id: 'eu-out-L',
    type: JackType.Audio,
    text: 'L',
    title: 'Audio Out L',
    modules: [{
      id: 2,
      block: 'input_L',
    }, 95],
  },
  {
    id: 'eu-out-R',
    type: JackType.Audio,
    text: 'R',
    title: 'Audio Out R',
    modules: [{
      id: 2,
      block: 'input_R',
    }, 96],
  },
  {
    id: 'eu-hp',
    type: JackType.Headphones,
    text: 'H',
    title: 'Headphones',
    modules: [2, 95, 96],
  },
  {
    id: 'eu-midi-in',
    type: JackType.Midi,
    title: 'Midi In',
    input: true,
    modules: [20, 21, 35, 82, 86],
  },
  {
    id: 'eu-in-1',
    type: JackType.Audio,
    text: '1',
    title: 'CV In 1',
    input: true,
    modules: [88],
  },
  {
    id: 'eu-in-2',
    type: JackType.Audio,
    text: '2',
    title: 'CV In 2',
    input: true,
    modules: [89],
  },
  {
    id: 'eu-in-3',
    type: JackType.Audio,
    text: '3',
    title: 'CV In 3',
    input: true,
    modules: [90],
  },
  {
    id: 'eu-in-4',
    type: JackType.Audio,
    text: '4',
    title: 'CV In 4',
    input: true,
    modules: [91],
  },
  {
    id: 'eu-out-1',
    type: JackType.Audio,
    text: '1',
    title: 'CV Out 1',
    modules: [99],
  },
  {
    id: 'eu-out-2',
    type: JackType.Audio,
    title: 'CV Out 2',
    text: '2',
    modules: [100],
  },
  {
    id: 'eu-out-3',
    type: JackType.Audio,
    title: 'CV Out 3',
    text: '3',
    modules: [101],
  },
  {
    id: 'eu-out-4',
    type: JackType.Audio,
    title: 'CV Out 14',
    text: '4',
    modules: [87],
  },
  {
    id: 'eu-midi-out',
    title: 'Midi Out',
    type: JackType.Midi,
    modules: [60, 61, 62, 84],
  },
]
