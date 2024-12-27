// Special mappings for single-letter cases
const singleLetterMappings: Record<string, string> = {
  'Rhythm': 'Rhy',
  'Random': 'Rnd',
  'Noise': 'Noi',
  'Tremolo': 'Tre',
  'Value': 'Val',
  'Gate': 'Gte',
  'Inverter': 'Inv',
  'Sampler': 'Smp',
  'Diffuser': 'Dif',
  'Granular': 'Grn',
  'Univibe': 'Uni',
  'Phaser': 'Phs',
  'Flanger': 'Flg',
  'Chorus': 'Chr',
  'Vibrato': 'Vib',
  'Compressor': 'Cmp',
  'Quantizer': 'Qnt',
  'Multiplier': 'Mlt',
}

// Common word mappings for audio/electronic terms
const commonMappings: Record<string, string> = {
  'and': '&',
  'Audio': 'Aud',
  'Button': 'Btn',
  'Control': 'Ctrl',
  'Divider': 'Div',
  'Detector': 'Det',
  'Filter': 'Filt',
  'Input': 'In',
  'Output': 'Out',
  'Switch': 'Sw',
  'Modulator': 'Mod',
  'Multiply': 'Mu',
  'Mixer': 'Mx',
  'Oscillator': 'Osc',
  'Reverb': 'Rv',
  'Delay': 'Dly',
  'Midi': 'Mi',
}

export type FitFn = (t: string) => boolean

export function abbreviateModuleName(text: string, isFit: FitFn) {
  // If original text fits, return it
  if (isFit(text)) return text

  // Handle Euro modules special case
  if (text.startsWith('Euro ')) {
    const parts = text.split(' ')
    const lastPart = parts[parts.length - 1]
    const isNumber = !isNaN(<number> <unknown> lastPart)

    // Create abbreviated form like ECO3, ECI1, etc.
    if (isNumber) {
      const abbr = parts.slice(1, -1).map((word) => word[0]).join('') + lastPart
      return 'E' + abbr
    }
  }

  // Check for single word special mappings first
  if (singleLetterMappings[text]) {
    const abbr = singleLetterMappings[text]
    if (isFit(abbr)) return abbr
  }

  // Try 4 letters single word
  if (!text.includes(' ') && isFit(text.slice(0, 4))) {
    return text.slice(0, 4)
  }

  // Try 3 letters single word
  if (!text.includes(' ') && isFit(text.slice(0, 3))) {
    return text.slice(0, 3)
  }

  // Helper to preserve numbers at the end
  const splitNumberSuffix = (str: string) => {
    const match = str.match(/^(.*?)(\d+)?$/)
    return [match?.[1] || '', match?.[2] || '']
  }

  // Strategy 1: Apply common mappings
  const [baseText, numSuffix] = splitNumberSuffix(text)
  const words: string[] = baseText.split(' ')
  let abbreviated = words.map((word) => commonMappings[word] || word).join(' ') + numSuffix
  if (isFit(abbreviated)) return abbreviated

  // Strategy 2: Concatenate multi-word abbreviations (e.g., "A O Sw" → "AOSw")
  if (words.length > 1) {
    abbreviated = words.map((word) => commonMappings[word] || word[0]).join('') + numSuffix
    if (isFit(abbreviated)) return abbreviated
  }

  // Strategy 2b: Concatenate multi-word abbreviations with first word as letter
  if (words.length > 1) {
    abbreviated = words.map((word, index) => !index ? word[0] : (commonMappings[word] || word[0])).join('') + numSuffix
    if (isFit(abbreviated)) return abbreviated
  }

  // Strategy 3: Ultra-compact form
  abbreviated = words.map((w) => w[0]).join('') + numSuffix
  if (isFit(abbreviated)) return abbreviated

  // If nothing else fits, return the shortest possible form
  return abbreviated
}
