// Common audio/control terms mapping
const commonMappings: Record<string, string> = {
  'audio_in': 'ai',
  'audio_out': 'ao',
  'cv_in': 'ci',
  'cv_out': 'co',
  'trigger_out': 'to',
  'trigger_in': 'ti',
  'velocity_out': 'vo',
  'gate_out': 'go',
  'note_out': 'no',
  'attack': 'atk',
  'decay': 'dec',
  'sustain': 'sus',
  'release': 'rel',
  'frequency': 'frq',
  'resonance': 'res',
  'threshold': 'thr',
  'feedback': 'fbk',
  'sensitivity': 'sen',
  'bandwidth': 'bw',
  'modulation': 'mod',
  'oscillator': 'osc',
  'envelope': 'env',
  'velocity': 'vel',
  'volume': 'vol',
  'position': 'pos',
  'control': 'ctl',
  'level': 'lvl',
  'output': 'out',
  'input': 'in',
  'filter': 'flt',
  'delay': 'dly',
  'reverb': 'rvb',
  'gain': 'gn',
  'pan': 'pn',
  'step': 'st',
  'note': 'nt',
}

export function abbreviateBlockName(text: string) {
  // Helper to handle stereo L/R with number
  const stereoMatch = text.match(/^(.+?)_(\d+)_(L|R)$/)
  if (stereoMatch) {
    const [, base, num, side] = stereoMatch
    const baseAbbr = commonMappings[base] || base.slice(0, 2)
    return `${baseAbbr}${num}${side.toLowerCase()}`
  }

  // Helper to extract number suffix
  const splitNumberSuffix = (str: string) => {
    const match = str.match(/^(.+?)_?(\d+)?$/)
    return [match?.[1] || '', match?.[2] || '']
  }

  // Handle regular numbered suffixes
  const [base, num] = splitNumberSuffix(text)

  // Get base abbreviation
  let abbr = commonMappings[base]
  if (!abbr) {
    // For unknown terms, keep first 4 chars or less
    abbr = base.replace(/_/g, '').slice(0, 4)
  }

  // Add number if present
  if (num) {
    // Ensure total length doesn't exceed 4 chars
    const maxBaseLength = 4 - num.length
    return abbr.slice(0, maxBaseLength) + num
  }

  return abbr
}
