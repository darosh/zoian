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
  'resonance': 'reso',
  'threshold': 'thr',
  'feedback': 'fbk',
  'value': 'val',
  'width': 'wid',
  'level': 'lvl',
  'output': 'out',
  'output_gain': 'outg',
  'reset': 'rst',
  'reset_in': 'rsti',
  'reset_out': 'rsto',
  'phase_input': 'phsi',
  'phase_reset': 'phsr',
  'input': 'in',
  'filter': 'flt',
  'delay': 'dly',
  'gain': 'gn',
  'pan': 'pn',
  'step': 'st',
  'note': 'nt',
}

export function abbreviateBlockName(text: string) {
  // Special cases for audio L/R without numbers
  if (text === 'audio_in_L') return 'ail'
  if (text === 'audio_in_R') return 'air'
  if (text === 'audio_out_L') return 'aol'
  if (text === 'audio_out_R') return 'aor'

  // Helper to handle stereo L/R with number
  const stereoMatch = text.match(/^(.+?)_(\d+)_(L|R)$/)
  if (stereoMatch) {
    const [, base, num, side] = stereoMatch
    const baseAbbr = commonMappings[base] || base.slice(0, 2)
    return `${baseAbbr}${num}${side.toLowerCase()}`
  }

  // Suffix mappings for compound terms
  const suffixMappings = {
    'position': 'pos',
    'time': 'tim',
    'control': 'ctl',
    'constant': 'con',
  }

  // Handle common compound terms
  for (const [suffix, abbr] of Object.entries(suffixMappings)) {
    if (text.endsWith('_' + suffix)) {
      const base = text.slice(0, -(suffix.length + 1))
      const baseAbbr = commonMappings[base] || base.slice(0, 4 - abbr.length)
      return baseAbbr + abbr
    }
  }

  // Helper to extract number suffix
  const splitNumberSuffix = (str: string) => {
    const match = str.match(/^(.+?)_?(\d+)?$/)
    return [match?.[1] || '', match?.[2] || '']
  }

  // Handle numbered suffixes
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
