import type { ModuleSpec } from '../spec/types.ts'

export enum ParamType {
  // Simple
  Ignored,
  One,
  Norm,

  // Numeric
  Percent,
  Speed,
  Mix,
  Swing,
  Resonance,
  Q,
  Q1,
  Ratio,
  Div,

  // Db
  Db0,
  Db8,
  Db18,
  Db32,
  Db40,
  Db80,
  Db100,

  // Midi
  Midi,
  NoteNum,

  // Time
  TimeMin,
  TimeMax,
  Env10,
  Env2,
  Time,
  Env,
  Size,
  Position,
  Tap,
  Rate,
  Time32,
  Time31,
  Time5,
  Time34,
  Time59,
  Time60,
  Time16,

  // Hz
  HzHigh,
  HzOnly,
  HzLow,

  // BPM
  FreqLow,
  ClockTime,
  DelayTime,
  TapMulti,
  TapMultiRev,
  TapMultiInf,
  TapMulti1,
  DelayTimeFaster,
  TapMulti2,

  // Pitch
  Note,
  Hz,
  Step,
  Pitch,
  Key,

  // Special
  Song,
  Pan,
  SizeSamples,
  ModSamples,
  Phase,
  PitchCents,
  HzRound,
  Steps,
  Scale,
  TapRatio,
  Bits,
  BitsFractional,
}

export type Range = [number | string, number | string, string?, number?]

const SCALES = ['Chromatic', 'Major', 'm Natural', 'm Harmonic', 'm Melodic', 'M Harmonic', 'Dorian', 'Phrygian', 'Lydian', 'Mixolydian', 'Locrian', 'M Locrian', 'Ahava Raba', 'Akebono', 'Bhairav', 'Marwa', 'Purvi', 'Todi', 'Pelog', 'Ukrainian', 'Romani', 'MHungarian', 'mHungarian', 'Persian', 'M Neapol', 'm Neapol', 'H Dim', 'W-H Dim', 'H-W Dim', 'Istrian', 'Prometheus', 'Harmonics', 'Tritone', '2Semi Tri', 'Wholetone', 'M Penta', 'm Penta', 'Hirajoshi1', 'Hirajoshi2', 'Hirajoshi3', 'Hirajoshi4', 'Hirajoshi5', 'Insen', 'Fourth', 'Dim Fifth', 'P Fifth', 'Aug Fifth', 'Octave']
const RATIOS = ['1:1', '2:3', '1:2', '1:3', '3:8', '1:4', '3:16', '1:8', '1:16', '1:32']

export const PARAM_RANGE: Record<ParamType, Range | Range[]> = {
  // Simple
  [ParamType.Ignored]: [0, 1],
  [ParamType.One]: [0, 1],
  [ParamType.Norm]: [-1, 1],

  // Numeric
  [ParamType.Percent]: [0, 100, '%'],
  [ParamType.Speed]: [0, 200, '%', 1],
  [ParamType.Mix]: [0, 100, 'mix=', 0],
  [ParamType.Swing]: [-100, 100, undefined, 1],
  [ParamType.Resonance]: [1, 999.9, undefined, 1],
  [ParamType.Q]: [.1, 100, undefined, 1],
  [ParamType.Q1]: [1, 999.89, undefined, 2],
  [ParamType.Ratio]: [1, Infinity],
  [ParamType.Div]: [1, 32, undefined, 0],

  // Db
  [ParamType.Db0]: [-Infinity, 0, 'dB', 2],
  [ParamType.Db8]: [-8, 8, 'dB', 1],
  [ParamType.Db18]: [-18, 18, 'dB', 1],
  [ParamType.Db32]: [0, 32, 'dB', 2],
  [ParamType.Db40]: [-40, 40, 'dB', 1],
  [ParamType.Db80]: [-80, 0, 'dB', 1],
  [ParamType.Db100]: [-100, 20, 'dB', 2],

  // Midi
  [ParamType.Midi]: [0, 127, undefined, 0],
  [ParamType.NoteNum]: [21, 127, undefined, 0],

  // Time
  [ParamType.TimeMin]: [0.02, 62.5, 'ms'],
  [ParamType.TimeMax]: [62.5, 60000, 'ms'],
  [ParamType.Env10]: [0, 10, 'ms'],
  [ParamType.Env2]: [0.01, 2, 's'],
  [ParamType.Time]: [0, Infinity, 's'],
  [ParamType.Env]: [1.33, 60000, 'ms'],
  [ParamType.Size]: [0.08, 999.86, 'ms'],
  [ParamType.Position]: [0.00, 999.98, 'ms'],
  [ParamType.Tap]: [25, 8000, 'ms'],
  [ParamType.Rate]: [0.05, 2, 's'],
  [ParamType.Time32]: [0, 32, 's'],
  [ParamType.Time31]: [0.013, 31.998, 's'],
  [ParamType.Time5]: [0, 5.9, 's'],
  [ParamType.Time34]: [2, 34.98, 'ms'],
  [ParamType.Time59]: [0, 59.99, 's'],
  [ParamType.Time60]: [0, 60000, 'ms'],
  [ParamType.Time16]: [0.02, 16000, 'ms'],

  // Hz
  [ParamType.HzHigh]: [1700, 4699, 'Hz'],
  [ParamType.HzOnly]: [27.5, 23999, 'Hz'],
  [ParamType.HzLow]: [0, 39.998, 'Hz'],

  // BPM
  [ParamType.FreqLow]: [[0.000, 39.998, 'Hz'], [Infinity, 25.0, 'ms'], [0, 2400, 'BPM']],
  [ParamType.ClockTime]: [[89478.480, 0.025, 's'], [0, 2400, 'BPM'], [0.000, 40.000, 'Hz']],
  [ParamType.DelayTime]: [[62.5, 2000, 'ms'], [960, 30, 'BPM'], [16.000, 0.500, 'Hz']],
  [ParamType.TapMulti]: [[0.500, 10.000, 'Hz'], [2000, 100, 'ms'], [30, 600, 'BPM']],
  [ParamType.TapMultiRev]: [[10.000, 0.500, 'Hz'], [100, 2000, 'ms'], [600, 30, 'BPM']],
  [ParamType.TapMultiInf]: [[Infinity, .125, 'Hz'], [0, 8000, 'ms'], [Infinity, 8, 'BPM']],
  [ParamType.TapMulti1]: [[10, .125, 'Hz'], [100, 8000, 'ms'], [600, 8, 'BPM']],
  [ParamType.DelayTimeFaster]: [[62.5, 1250, 'ms'], [960, 48, 'BPM'], [16.000, 0.800, 'Hz']],
  [ParamType.TapMulti2]: [[10, .8, 'Hz'], [100, 1250, 'ms'], [600, 48, 'BPM']],

  // Pitch
  [ParamType.Note]: ['A0', 'A10'],
  [ParamType.Hz]: [[27.5, 23999, 'Hz'], ['A0', 'A10']],
  [ParamType.Step]: [['A0', 'A10'], [0, 1]],
  [ParamType.Pitch]: [[3.1, 3199.7, '%'], [-60, 60, 'semitones'], [-6000, 6000, 'cents']],
  [ParamType.Key]: ['A', 'G#'],

  // Special
  [ParamType.Song]: ['001:1:0', '1024:4:18'],
  [ParamType.Pan]: ['L100 R0', 'L0 R100'],
  [ParamType.SizeSamples]: [80, 4999, 'samples'],
  [ParamType.ModSamples]: [3, 499, 'samples'],
  [ParamType.Phase]: [-360, 360, 'deg'],
  [ParamType.PitchCents]: [-12, 12], // -/+ 10 cents,4 semitones,5 semitones, 12 semitones
  [ParamType.HzRound]: [28, 23999],
  [ParamType.Steps]: [2, 63, 'steps'],
  [ParamType.Scale]: [SCALES[0], <string> SCALES.at(-1)],
  [ParamType.TapRatio]: [RATIOS[0], <string> RATIOS.at(-1)],
  [ParamType.Bits]: [0, 31, 'bits', 0],
  [ParamType.BitsFractional]: [0, 32, 'bits', 1],
}

export type TypeSpec = { type: ParamType; modules: string[] }
export type TypesSpec = { types: [ParamType, string, string][]; modules: string[] }

export const TYPE_MAP: Record<string, (TypeSpec | TypesSpec)[]> = {
  // Different across modules
  frequency: [
    { type: ParamType.Hz, modules: ['SV Filter', 'Oscillator', 'Ring Modulator'] },
    { type: ParamType.HzRound, modules: ['Multi Filter'] },
  ],
  gain: [
    { type: ParamType.Db100, modules: ['Audio Out', 'Audio Mixer'] },
    { type: ParamType.Db40, modules: ['Multi Filter'] },
    { type: ParamType.Db0, modules: ['Diffuser'] },
  ],
  delay_time: [
    { type: ParamType.Time16, modules: ['Delay Line'] },
    { type: ParamType.DelayTimeFaster, modules: ['Reverse Delay'] },
    { type: ParamType.DelayTime, modules: ['Delay w/ Mod', 'Ping Pong Delay'] },
    { type: ParamType.Time34, modules: ['Stereo Spread'] },
    { type: ParamType.Env, modules: ['CV Delay'] },
  ],
  resonance: [
    { type: ParamType.Resonance, modules: ['SV Filter'] },
    { type: ParamType.Db0, modules: ['Phaser'] },
    { type: ParamType.One, modules: ['Ghostverb', 'Univibe'] },
  ],
  rate: [
    { type: ParamType.FreqLow, modules: ['Phaser', 'Tremolo', 'Flanger', 'Chorus', 'Vibrato', 'Univibe'] },
    { type: ParamType.Rate, modules: ['Ghostverb'] },
  ],
  input_gain: [
    { type: ParamType.Db32, modules: ['OD and Distortion'] },
    { type: ParamType.Db40, modules: ['Fuzz'] },
  ],
  mod_rate: [
    { type: ParamType.Time5, modules: ['Diffuser'] },
    { type: ParamType.HzLow, modules: ['Delay w/ Mod', 'Ping Pong Delay'] },
  ],
  threshold: [
    { type: ParamType.One, modules: ['Gate', 'Logic Gate'] },
    { type: ParamType.Db80, modules: ['Compressor'] },
  ],
  cv_in: [
    { type: ParamType.One, modules: ['ADSR', 'Sample and Hold', 'CV Invert', 'Steps', 'Slew Limiter', 'Multiplier', 'Quantizer', 'In Switch', 'Out Switch', 'CV Delay', 'CV Loop', 'CV Filter', 'CV Rectify', 'Trigger', 'CPort CV Out', 'CV Flip Flop', 'Pixel', 'Euro CV Out 4', 'Euro CV Out 1', 'Euro CV Out 2', 'Euro CV Out 3', 'CV Mixer'] },
    { type: ParamType.ClockTime, modules: ['Clock Divider'] },
  ],
  attack: [
    { type: ParamType.Env, modules: ['ADSR', 'Gate'] },
    { type: ParamType.Env10, modules: ['Compressor'] },
  ],
  release: [
    { type: ParamType.Env, modules: ['ADSR', 'Gate'] },
    { type: ParamType.Env2, modules: ['Compressor'] },
  ],
  tap_tempo_in: [
    { type: ParamType.Time16, modules: ['Delay Line'] },
    { type: ParamType.TapMulti2, modules: ['Reverse Delay'] },
    { type: ParamType.TapMultiRev, modules: ['Ping Pong Delay'] },
    { type: ParamType.TapMulti1, modules: ['Vibrato', 'Univibe'] },
    { type: ParamType.TapMultiInf, modules: ['Flanger', 'Chorus'] },
    { type: ParamType.TapMulti, modules: ['Delay w/ Mod'] },
    { type: ParamType.Tap, modules: ['Phaser', 'Tremolo'] },
  ],

  // Same across modules
  mix: [{ type: ParamType.Mix, modules: ['Plate Reverb', 'Phaser', 'Delay w/ Mod', 'Audio Balance', 'Ghostverb', 'Flanger', 'Chorus', 'Ring Modulator', 'Hall Reverb', 'Ping Pong Delay', 'Reverb Lite', 'Room Reverb', 'Reverse Delay', 'Univibe'] }],
  gate_in: [{ type: ParamType.One, modules: ['Sequencer', 'Midi Note Out'] }],
  output_gain: [{ type: ParamType.Db0, modules: ['OD and Distortion', 'Fuzz'] }],
  duty_cycle: [{ type: ParamType.Percent, modules: ['Oscillator', 'Ring Modulator'] }],
  decay_time: [{ type: ParamType.Time, modules: ['Plate Reverb', 'Hall Reverb', 'Reverb Lite', 'Room Reverb'] }],
  low_eq: [{ type: ParamType.Db8, modules: ['Plate Reverb', 'Hall Reverb', 'Room Reverb'] }],
  width: [{ type: ParamType.One, modules: ['Phaser', 'Flanger', 'Chorus', 'Vibrato'] }],
  record: [{ type: ParamType.One, modules: ['Looper', 'CV Loop', 'Sampler'] }],
  speed_pitch: [{ type: ParamType.Pitch, modules: ['Looper', 'Granular', 'Sampler'] }],
  // start_position: [{ type: ParamType.Time32, modules: ['Looper', 'CV Loop'] }],
  start_position: [{ type: ParamType.Ignored, modules: ['Looper', 'CV Loop'] }],
  reset: [{ type: ParamType.One, modules: ['Looper', 'Midi Clock Out'] }],
  in_select: [{ type: ParamType.One, modules: ['In Switch', 'Audio In Switch', 'Audio Out Switch'] }],
  sensitivity: [{ type: ParamType.One, modules: ['Onset Detector', 'Env Filter'] }],
  play: [{ type: ParamType.One, modules: ['Rhythm', 'CV Loop'] }],
  trigger_in: [{ type: ParamType.One, modules: ['Random', 'Midi PC Out'] }],
  direct: [{ type: ParamType.One, modules: ['Tremolo', 'Flanger', 'Chorus', 'Vibrato', 'Univibe'] }],
  depth: [{ type: ParamType.One, modules: ['Tremolo', 'Univibe'] }],
  feedback: [{ type: ParamType.Db0, modules: ['Delay w/ Mod', 'Ping Pong Delay', 'Reverse Delay'] }],
  mod_depth: [{ type: ParamType.One, modules: ['Delay w/ Mod', 'Ping Pong Delay'] }],
  in: [{ type: ParamType.One, modules: ['UI Button', 'Logic Gate'] }],
  pan: [{ type: ParamType.Pan, modules: ['Audio Panner', 'Audio Mixer'] }],
  tone_tilt_eq: [{ type: ParamType.Db8, modules: ['Flanger', 'Chorus'] }],
  lpf_freq: [{ type: ParamType.HzHigh, modules: ['Hall Reverb', 'Room Reverb'] }],

  // Dual
  value: [{
    types: [
      [ParamType.One, 'output', '0 to 1'],
      [ParamType.Norm, 'output', '-1 to 1'],
    ],
    modules: ['Value'],
  }],
  crushed_bits: [{
    types: [
      [ParamType.Bits, 'fractions', 'off'],
      [ParamType.BitsFractional, 'fractions', 'on'],
    ],
    modules: ['Bit Crusher'],
  }],

  // Single use
  out_select: [{ type: ParamType.Ignored, modules: ['Out Switch'] }],
  alias_amount: [{ type: ParamType.Hz, modules: ['Aliaser'] }],
  step: [{ type: ParamType.Step, modules: ['Sequencer'] }],
  queue_start: [{ type: ParamType.One, modules: ['Sequencer'] }],
  key_input_note: [{ type: ParamType.One, modules: ['Sequencer'] }],
  key_input_gate: [{ type: ParamType.One, modules: ['Sequencer'] }],
  cv_control: [{ type: ParamType.FreqLow, modules: ['LFO'] }],
  tap_control: [{ type: ParamType.FreqLow, modules: ['LFO'] }],
  swing_amount: [{ type: ParamType.Swing, modules: ['LFO'] }],
  phase_input: [{ type: ParamType.Phase, modules: ['LFO'] }],
  phase_reset: [{ type: ParamType.One, modules: ['LFO'] }],
  retrigger: [{ type: ParamType.One, modules: ['ADSR'] }],
  delay: [{ type: ParamType.Env, modules: ['ADSR'] }],
  hold_attack_decay: [{ type: ParamType.Env, modules: ['ADSR'] }],
  decay: [{ type: ParamType.Env, modules: ['ADSR'] }],
  sustain: [{ type: ParamType.One, modules: ['ADSR'] }],
  hold_sustain_release: [{ type: ParamType.Env, modules: ['ADSR'] }],
  level_control: [{ type: ParamType.Db0, modules: ['VCA'] }],
  trigger: [{ type: ParamType.One, modules: ['Sample and Hold'] }],
  modulation_in: [{ type: ParamType.Time16, modules: ['Delay Line'] }],
  rise_time: [{ type: ParamType.Env, modules: ['Env Follower'] }],
  fall_time: [{ type: ParamType.Env, modules: ['Env Follower'] }],
  note: [{ type: ParamType.Note, modules: ['Keyboard'] }],
  quant_steps: [{ type: ParamType.Steps, modules: ['Steps'] }],
  slew_rate: [{ type: ParamType.Time59, modules: ['Slew Limiter'] }],
  rising_lag: [{ type: ParamType.Time60, modules: ['Slew Limiter'] }],
  falling_lag: [{ type: ParamType.Time60, modules: ['Slew Limiter'] }],
  ratio: [{ type: ParamType.Ratio, modules: ['Compressor'] }],
  q: [{ type: ParamType.Q, modules: ['Multi Filter'] }],
  high_eq: [{ type: ParamType.Db8, modules: ['Plate Reverb'] }],
  filter_gain: [{ type: ParamType.Db0, modules: ['All Pass Filter'] }],
  key: [{ type: ParamType.Key, modules: ['Quantizer'] }],
  scale: [{ type: ParamType.Scale, modules: ['Quantizer'] }],
  control_in: [{ type: ParamType.One, modules: ['Phaser'] }],
  restart_playback: [{ type: ParamType.One, modules: ['Looper'] }],
  stop_play: [{ type: ParamType.One, modules: ['Looper'] }],
  rec_start_stop: [{ type: ParamType.One, modules: ['Rhythm'] }],
  rhythm_in: [{ type: ParamType.One, modules: ['Rhythm'] }],
  // loop_length: [{ type: ParamType.Time31, modules: ['Looper'] }],
  loop_length: [{ type: ParamType.Ignored, modules: ['Looper'] }],
  reverse_playback: [{ type: ParamType.One, modules: ['Looper'] }],
  low_shelf: [{ type: ParamType.Db18, modules: ['Tone Control'] }],
  mid_gain: [{ type: ParamType.Db18, modules: ['Tone Control'] }],
  mid_freq: [{ type: ParamType.HzRound, modules: ['Tone Control'] }],
  high_shelf: [{ type: ParamType.Db18, modules: ['Tone Control'] }],
  playback_speed: [{ type: ParamType.Speed, modules: ['CV Loop'] }],
  stop_position: [{ type: ParamType.Ignored, modules: ['CV Loop'] }],
  restart_loop: [{ type: ParamType.One, modules: ['CV Loop'] }],
  time_constant: [{ type: ParamType.Env, modules: ['CV Filter'] }],
  rise_constant: [{ type: ParamType.Env, modules: ['CV Filter'] }],
  fall_constant: [{ type: ParamType.Env, modules: ['CV Filter'] }],
  reset_in: [{ type: ParamType.One, modules: ['Clock Divider'] }],
  modifier: [{ type: ParamType.Ignored, modules: ['Clock Divider'] }], // old version
  dividend: [{ type: ParamType.Div, modules: ['Clock Divider'] }],
  divisor: [{ type: ParamType.Div, modules: ['Clock Divider'] }],
  cv_positive_input: [{ type: ParamType.One, modules: ['Comparator'] }],
  cv_negative_input: [{ type: ParamType.One, modules: ['Comparator'] }],
  side_gain: [{ type: ParamType.Db40, modules: ['Stereo Spread'] }],
  pitch_shift: [{ type: ParamType.Pitch, modules: ['Pitch Shifter'] }],
  note_in: [{ type: ParamType.NoteNum, modules: ['Midi Note Out'] }],
  velocity_in: [{ type: ParamType.One, modules: ['Midi Note Out'] }],
  cc: [{ type: ParamType.Midi, modules: ['Midi CC Out'] }],
  pc: [{ type: ParamType.Midi, modules: ['Midi PC Out'] }],
  decay_feedback: [{ type: ParamType.One, modules: ['Ghostverb'] }],
  regen: [{ type: ParamType.Db0, modules: ['Flanger'] }],
  min_freq: [{ type: ParamType.HzOnly, modules: ['Env Filter'] }],
  max_freq: [{ type: ParamType.HzOnly, modules: ['Env Filter'] }],
  filter_q: [{ type: ParamType.Q1, modules: ['Env Filter'] }],
  size: [{ type: ParamType.SizeSamples, modules: ['Diffuser'] }],
  mod_width: [{ type: ParamType.ModSamples, modules: ['Diffuser'] }],
  grain_size: [{ type: ParamType.Size, modules: ['Granular'] }],
  grain_position: [{ type: ParamType.Position, modules: ['Granular'] }],
  density: [{ type: ParamType.One, modules: ['Granular'] }],
  texture: [{ type: ParamType.One, modules: ['Granular'] }],
  freeze: [{ type: ParamType.One, modules: ['Granular'] }],
  tap_cv_control: [{ type: ParamType.One, modules: ['Midi Clock Out'] }],
  sent: [{ type: ParamType.One, modules: ['Midi Clock Out'] }],
  send_position: [{ type: ParamType.One, modules: ['Midi Clock Out'] }],
  song_position: [{ type: ParamType.Song, modules: ['Midi Clock Out'] }],
  min_time: [{ type: ParamType.TimeMin, modules: ['Tap to CV'] }],
  max_time: [{ type: ParamType.TimeMax, modules: ['Tap to CV'] }],
  level: [{ type: ParamType.One, modules: ['Euro Headphone Amp'] }],
  sample_playback: [{ type: ParamType.One, modules: ['Sampler'] }],
  direction: [{ type: ParamType.One, modules: ['Sampler'] }],
  start: [{ type: ParamType.Ignored, modules: ['Sampler'] }],
  length: [{ type: ParamType.Ignored, modules: ['Sampler'] }],
  bypass: [{ type: ParamType.Ignored, modules: ['Device Control'] }],
  aux: [{ type: ParamType.Ignored, modules: ['Device Control'] }],
  performance: [{ type: ParamType.Ignored, modules: ['Device Control'] }],
  atten: [{ type: ParamType.Norm, modules: ['CV Mixer'] }],
  tap_ratio: [{ type: ParamType.TapRatio, modules: ['Reverse Delay'] }],
  pitch: [{ type: ParamType.PitchCents, modules: ['Reverse Delay'] }],
}

export function getParamType(blockName: string, module: ModuleSpec): ParamType | [ParamType, string, string][] {
  const name = blockName.replace(/_\d+$/, '')
  const value = TYPE_MAP[name]

  if (value.length === 1) {
    return ((<TypeSpec> value[0])?.type !== undefined) ? (<TypeSpec> value[0])?.type : (<TypesSpec> value[0])?.types
  }

  const t = <TypeSpec | TypesSpec> value?.find((set) => set.modules.includes(module.name))

  return (<TypeSpec> t)?.type || (<TypesSpec> t)?.types
}

export function getParamInfo(blockName: string, module: ModuleSpec): string {
  const pt = getParamType(blockName, module)

  const ptt = Array.isArray(pt) ? pt : [[pt]]

  return ptt
    .map((x) => {
      return `${ParamType[x[0]]}: [${PARAM_RANGE[x[0]].join(', ')}]`
    })
    .join(', ')
}
