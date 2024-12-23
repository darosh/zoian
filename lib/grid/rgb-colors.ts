import { COLOR_ORDER, Colors } from '../spec/colors.ts'
import { interpolateCubehelix, interpolateHsl, interpolateRgb } from 'd3-interpolate'

export function getColors(): {
  RGBColors: Record<Colors, string>
  DocColors: string[]
  ColorScales: Record<Colors, Record<400, string>>
  AdjustedColors: string[]
  LightColors: string[]
  DesaColors: string[]
  DarkColors: string[]
  DesaDarkColors: string[]
  BLOCK_COLORS: Record<string, { light: string; dark: string; base: string }>
} {
  const RGBColors: Record<Colors, string> = {
    [Colors.Red]: '#ec4244',
    [Colors.Orange]: '#EE8C5C',
    [Colors.Mango]: '#F3B18A',
    [Colors.Yellow]: '#eeda6e',
    [Colors.Lime]: '#c6e86a',
    [Colors.Green]: '#6EED9F',
    [Colors.Surf]: '#7cdbf1',
    [Colors.Aqua]: '#78b5e5',
    [Colors.Sky]: '#B1D6FB',
    [Colors.Blue]: '#539bf8',
    [Colors.Purple]: '#ab62fa',
    [Colors.Magenta]: '#dc56fc',
    [Colors.Pink]: '#fa87f0',
    [Colors.Peach]: '#E769B6',
    [Colors.White]: '#d8d8d8',
  }

  const ColorScales = {
    [Colors.Red]: { 400: '#E14E50' },
    [Colors.Orange]: { 400: '#E18D5C' },
    [Colors.Mango]: { 400: '#E19A6E' },
    [Colors.Yellow]: { 400: '#E1D571' },
    [Colors.Lime]: { 400: '#A1E171' },
    [Colors.Green]: { 400: '#71C693' },
    [Colors.Surf]: { 400: '#71C6C6' },
    [Colors.Aqua]: { 400: '#71B8E1' },
    [Colors.Sky]: { 400: '#71A1E1' },
    [Colors.Blue]: { 400: '#4F8DDD' },
    [Colors.Purple]: { 400: '#986ACA' },
    [Colors.Magenta]: { 400: '#CA70D5' },
    [Colors.Pink]: { 400: '#E16EA7' },
    [Colors.Peach]: { 400: '#E16E7C' },
    [Colors.White]: { 400: '#9C9C9C' },
  }

  const DocColors = [
    'rgb(255,43,43)',
    'rgb(238,157,34)',
    'rgb(236,189,31)',
    'rgb(241,203,88)',
    'rgb(172,239,87)',
    'rgb(128,245,117)',
    'rgb(117,155,163)',
    'rgb(75,115,179)',
    'rgb(105,162,214)',
    'rgb(74,74,255)',
    'rgb(149,129,200)',
    'rgb(255,66,255)',
    'rgb(129,54,101)',
    'rgb(113,76,69)',
    'rgb(128,128,128)',
  ]

  const AdjustedColors: string[] = [
    RGBColors[Colors.Red],
    interpolateCubehelix(RGBColors[Colors.Orange], DocColors[1])(.5),
    interpolateCubehelix(RGBColors[Colors.Mango], DocColors[2])(.8),
    interpolateCubehelix(RGBColors[Colors.Yellow], 'yellow')(.08),
    interpolateCubehelix(RGBColors[Colors.Lime], 'yellow')(.08),
    interpolateCubehelix(RGBColors[Colors.Green], DocColors[5])(.1),
    interpolateCubehelix(RGBColors[Colors.Surf], ColorScales[Colors.Surf][400])(0.06),
    interpolateCubehelix(RGBColors[Colors.Aqua], ColorScales[Colors.Aqua][400])(.5),
    interpolateCubehelix(RGBColors[Colors.Sky], DocColors[8])(.1),
    interpolateCubehelix(RGBColors[Colors.Blue], DocColors[9])(.2),
    interpolateCubehelix(RGBColors[Colors.Purple], DocColors[8])(.1),
    interpolateCubehelix(RGBColors[Colors.Magenta], DocColors[11])(.7),
    interpolateCubehelix(RGBColors[Colors.Pink], ColorScales[Colors.Pink][400])(.05),
    interpolateCubehelix(RGBColors[Colors.Peach], ColorScales[Colors.Mango][400])(.4),
    RGBColors[Colors.White],
  ]

  const LightColors: string[] = [
    interpolateCubehelix(AdjustedColors[0], '#fff')(.65),
    interpolateCubehelix(AdjustedColors[1], '#fff')(.57),
    interpolateCubehelix(AdjustedColors[2], '#fff')(.5),
    interpolateCubehelix(AdjustedColors[3], '#fff')(.4),
    interpolateCubehelix(AdjustedColors[4], '#fff')(.45),
    interpolateCubehelix(AdjustedColors[5], '#fff')(.55),
    interpolateCubehelix(AdjustedColors[6], '#fff')(.45),
    interpolateCubehelix(AdjustedColors[7], '#fff')(.5),
    interpolateCubehelix(AdjustedColors[8], '#fff')(.5),
    interpolateCubehelix(AdjustedColors[9], '#fff')(.5),
    interpolateCubehelix(AdjustedColors[10], '#fff')(.6),
    interpolateCubehelix(AdjustedColors[11], '#fff')(.66),
    interpolateCubehelix(AdjustedColors[12], '#fff')(.55),
    interpolateCubehelix(AdjustedColors[13], '#fff')(.66),
    interpolateCubehelix(AdjustedColors[14], '#fff')(.75),
  ]

  const DarkColors: string[] = [
    interpolateCubehelix(AdjustedColors[0], '#000')(.3),
    interpolateCubehelix(AdjustedColors[1], '#000')(.3),
    interpolateCubehelix(AdjustedColors[2], '#000')(.3),
    interpolateCubehelix(AdjustedColors[3], '#000')(.3),
    interpolateCubehelix(AdjustedColors[4], '#000')(.4),
    interpolateCubehelix(AdjustedColors[5], '#000')(.5),
    interpolateCubehelix(AdjustedColors[6], '#000')(.45),
    interpolateCubehelix(AdjustedColors[7], '#000')(.4),
    interpolateCubehelix(AdjustedColors[8], '#000')(.4),
    interpolateCubehelix(AdjustedColors[9], '#000')(.4),
    interpolateCubehelix(AdjustedColors[10], '#000')(.4),
    interpolateCubehelix(AdjustedColors[11], '#000')(.5),
    interpolateCubehelix(AdjustedColors[12], '#000')(.4),
    interpolateCubehelix(AdjustedColors[13], '#000')(.4),
    interpolateCubehelix(AdjustedColors[14], '#000')(.5),
  ]

  const DesaColors: string[] = LightColors.map((c) => interpolateRgb.gamma(2.2)(interpolateCubehelix(c, '#888')(.06), '#ddd')(.25))

  const DesaDarkColors: string[] = DarkColors.map((c) => {
    let d = interpolateHsl(c, '#000')(.12)
    d = interpolateRgb.gamma(2.1)(d, 'rgb(18,18,18)')(.4)

    return d
  })

  type ColorDic = Record<string, { light: string; dark: string; base: string }>

  const BLOCK_COLORS: ColorDic = COLOR_ORDER.reduce((acc, v, i) => {
    acc[v] = {
      light: DesaColors[i],
      dark: DesaDarkColors[i],
      base: AdjustedColors[i],
    }
    return acc
  }, <ColorDic> {})

  return {
    RGBColors,
    DocColors,
    ColorScales,
    AdjustedColors,
    LightColors,
    DesaColors,
    DarkColors,
    DesaDarkColors,
    BLOCK_COLORS,
  }
}

export const BLOCK_COLORS = {
  '1': {
    'light': 'rgb(176, 198, 247)',
    'dark': 'rgb(24, 61, 127)',
    'base': 'rgb(76, 140, 254)',
  },
  '2': {
    'light': 'rgb(191, 241, 200)',
    'dark': 'rgb(12, 107, 37)',
    'base': 'rgb(111, 238, 155)',
  },
  '3': {
    'light': 'rgb(243, 186, 186)',
    'dark': 'rgb(129, 28, 29)',
    'base': '#ec4244',
  },
  '4': {
    'light': 'rgb(243, 226, 165)',
    'dark': 'rgb(138, 113, 12)',
    'base': 'rgb(242, 221, 96)',
  },
  '5': {
    'light': 'rgb(191, 214, 243)',
    'dark': 'rgb(33, 81, 113)',
    'base': 'rgb(116, 182, 227)',
  },
  '6': {
    'light': 'rgb(246, 187, 242)',
    'dark': 'rgb(107, 14, 113)',
    'base': 'rgb(244, 72, 255)',
  },
  '7': {
    'light': 'rgb(234, 234, 234)',
    'dark': 'rgb(75, 75, 75)',
    'base': '#d8d8d8',
  },
  '8': {
    'light': 'rgb(245, 205, 174)',
    'dark': 'rgb(138, 66, 12)',
    'base': 'rgb(242, 146, 64)',
  },
  '9': {
    'light': 'rgb(223, 235, 167)',
    'dark': 'rgb(77, 118, 12)',
    'base': 'rgb(200, 236, 91)',
  },
  '10': {
    'light': 'rgb(188, 227, 246)',
    'dark': 'rgb(16, 97, 116)',
    'base': 'rgb(123, 218, 239)',
  },
  '11': {
    'light': 'rgb(210, 224, 247)',
    'dark': 'rgb(47, 92, 136)',
    'base': 'rgb(169, 209, 249)',
  },
  '12': {
    'light': 'rgb(222, 193, 242)',
    'dark': 'rgb(72, 39, 127)',
    'base': 'rgb(161, 105, 251)',
  },
  '13': {
    'light': 'rgb(246, 197, 241)',
    'dark': 'rgb(131, 38, 121)',
    'base': 'rgb(250, 133, 237)',
  },
  '14': {
    'light': 'rgb(245, 203, 214)',
    'dark': 'rgb(123, 40, 59)',
    'base': 'rgb(241, 119, 147)',
  },
  '15': {
    'light': 'rgb(246, 214, 161)',
    'dark': 'rgb(140, 88, 12)',
    'base': 'rgb(243, 183, 54)',
  },
}
