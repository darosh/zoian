import { MODULES } from '../../lib/spec/modules.ts'
import { GX } from '../../lib/index.ts'
import stringify from 'json-stringify-pretty-compact'


let canvas: HTMLCanvasElement | undefined
let ctx: CanvasRenderingContext2D | null = null

export function measure (text: string, font: string, px: number) {
  canvas = canvas || document.createElement('canvas')
  ctx = <CanvasRenderingContext2D>ctx || canvas.getContext('2d')
  ctx.font = `normal 600 ${px}px ${font}`
  return ctx?.measureText(text)
}

const spacer = (blocks: number) => {
  const m = 4 / 4 * 3

  return blocks * 24 + (blocks - 1) * 4 - 2 * m
}

export function measureModules (abbreaviator: (text: string, isFit: (t: string) => boolean) => string,  font: string = 'Montserrat', px: number = 7, space = spacer) {
  const r: Record<string, string[]> = {}
  const pxPerBlock: number[] = []

  for (let i = 1; i < GX; i++) {
    pxPerBlock.push(space(i))
  }

  const names = []

  console.log(pxPerBlock)

  for (const { name } of MODULES) {
    const fits = []

    for (let j = 0; j < pxPerBlock.length; j++) {
      const isFit = (text: string) => {
        const is = measure(text, font, px).width < pxPerBlock[j]

        if (is) {
          console.log(`"${text}" < ${pxPerBlock[j]}px`)
        } else {
          console.log(`"${text}" > ${pxPerBlock[j]}px`)
        }

        return is
      }


      const abbr = isFit(name) ? name : abbreaviator(name, isFit)

      if (abbr !== name) {
        fits.push(abbr)
      }
    }

    console.log(name, `[${fits.toString()}]`)

    r[name] = fits

    names.push(name)
  }

  console.log(stringify(r, {maxLength: 210}))
  console.log(stringify(Object.values(r), {maxLength: 210}))

  return r
}
