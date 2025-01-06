import type { ModuleSpec } from '../spec/types.ts'

export enum ParamType {
  Unknown,
  One,
  Ignored,
  Norm,
  Db0,
  Db8,
  Db40,
  Db100,
  Midi,
  NoteNum,
  Note,
  Resonance,
  Song,
  Percent,
  Pan,
  Q,
  Hz,
  HzRound,
  Step,
  Mix,
  Time,
  Env,
  Steps,
  Bits,
  Time16,
  Pitch,
  Time32,
  Time31,
  SizeSamples,
  ModSamples,
  Time5,
  Phase,
  Time34,
}

type Range = [number | string, number | string, string?]

export const PARAM_RANGE: Record<ParamType, Range | Range[]> = {
  [ParamType.Unknown]: [0, 1, '?'],
  [ParamType.One]: [0, 1],
  [ParamType.Ignored]: [0, 1],
  [ParamType.Norm]: [-1, 1],
  [ParamType.Db0]: [-Infinity, 0, 'dB'],
  [ParamType.Db8]: [-8, 8, 'dB'],
  [ParamType.Db40]: [-40, 40, 'dB'],
  [ParamType.Db100]: [-100, 20, 'dB'],
  [ParamType.Midi]: [0, 127],
  [ParamType.NoteNum]: [21, 127],
  [ParamType.Note]: ['A0', 'A10'],
  [ParamType.Resonance]: [1, 999.9],
  [ParamType.Song]: ['001:1:0', '1024:4:18'],
  [ParamType.Percent]: [0, 100, '%'],
  [ParamType.Pan]: ['L100 R0', 'L0 R100'],
  [ParamType.Q]: [.1, 100],
  [ParamType.Hz]: [[27.5, 23999], ['A0', 'A10']],
  [ParamType.HzRound]: [28, 23999],
  [ParamType.Step]: [['A0', 'A10'], [0, 1]],
  [ParamType.Mix]: [0, 100],
  [ParamType.Time]: [0, Infinity, 's'],
  [ParamType.Env]: [1.33, 60000, 'ms'],
  [ParamType.Steps]: [2, 63, 'steps'],
  [ParamType.Bits]: [[0, 31], [0, 32]], // ?
  [ParamType.Time16]: [0.02, 16000, 'ms'],
  [ParamType.Pitch]: [[3.1, 3199.7, '%'], [-60, 60, 'semitones'], [-6000, 6000, 'cents']],
  [ParamType.Time32]: [0, 32, 's'],
  [ParamType.Time31]: [0.013, 31.998, 's'],
  [ParamType.SizeSamples]: [80, 4999, 'samples'],
  [ParamType.ModSamples]: [3, 499, 'samples'],
  [ParamType.Time5]: [0, 5.9, 's'],
  [ParamType.Phase]: [-360, 360, 'deg'],
  [ParamType.Time34]: [2, 34.98, 'ms'],
}

const TYPE_MAP: Record<string, { type: ParamType; modules: string[] }[]> = {
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
    { type: ParamType.Time16, modules: ['Delay Line', 'Delay w/ Mod', 'CV Delay', 'Ping Pong Delay', 'Reverse Delay'] },
    { type: ParamType.Time34, modules: ['Stereo Spread'] },
  ],
  resonance: [
    { type: ParamType.Resonance, modules: ['SV Filter'] },
    { type: ParamType.Db0, modules: ['Phaser'] },
    { type: ParamType.One, modules: ['Ghostverb', 'Univibe'] },
  ],

  // Same across modules
  mix: [{ type: ParamType.Mix, modules: ['Plate Reverb', 'Phaser', 'Delay w/ Mod', 'Audio Balance', 'Ghostverb', 'Flanger', 'Chorus', 'Ring Modulator', 'Hall Reverb', 'Ping Pong Delay', 'Reverb Lite', 'Room Reverb', 'Reverse Delay', 'Univibe'] }],
  gate_in: [{ type: ParamType.One, modules: ['Sequencer', 'Midi Note Out'] }],
  cv_in: [{ type: ParamType.One, modules: ['ADSR', 'Sample and Hold', 'CV Invert', 'Steps', 'Slew Limiter', 'Multiplier', 'Quantizer', 'In Switch', 'Out Switch', 'CV Delay', 'CV Loop', 'CV Filter', 'Clock Divider', 'CV Rectify', 'Trigger', 'CPort CV Out', 'CV Flip Flop', 'Pixel', 'Euro CV Out 4', 'Euro CV Out 1', 'Euro CV Out 2', 'Euro CV Out 3', 'CV Mixer'] }],
  attack: [{ type: ParamType.Env, modules: ['ADSR', 'Compressor', 'Gate'] }],
  release: [{ type: ParamType.Env, modules: ['ADSR', 'Compressor', 'Gate'] }],
  input_gain: [{ type: ParamType.Unknown, modules: ['OD and Distortion', 'Fuzz'] }],
  output_gain: [{ type: ParamType.Unknown, modules: ['OD and Distortion', 'Fuzz'] }],
  tap_tempo_in: [{ type: ParamType.Time16, modules: ['Delay Line', 'Phaser', 'Tremolo', 'Delay w/ Mod', 'Flanger', 'Chorus', 'Vibrato', 'Ping Pong Delay', 'Reverse Delay', 'Univibe'] }],
  duty_cycle: [{ type: ParamType.Percent, modules: ['Oscillator', 'Ring Modulator'] }],
  threshold: [{ type: ParamType.One, modules: ['Compressor', 'Gate', 'Logic Gate'] }],
  decay_time: [{ type: ParamType.Time, modules: ['Plate Reverb', 'Hall Reverb', 'Reverb Lite', 'Room Reverb'] }],
  low_eq: [{ type: ParamType.Db8, modules: ['Plate Reverb', 'Hall Reverb', 'Room Reverb'] }],
  rate: [{ type: ParamType.Unknown, modules: ['Phaser', 'Tremolo', 'Ghostverb', 'Flanger', 'Chorus', 'Vibrato', 'Univibe'] }],
  width: [{ type: ParamType.Unknown, modules: ['Phaser', 'Flanger', 'Chorus', 'Vibrato'] }],
  record: [{ type: ParamType.One, modules: ['Looper', 'CV Loop', 'Sampler'] }],
  speed_pitch: [{ type: ParamType.Pitch, modules: ['Looper', 'Granular', 'Sampler'] }],
  start_position: [{ type: ParamType.Time32, modules: ['Looper', 'CV Loop'] }],
  reset: [{ type: ParamType.One, modules: ['Looper', 'Midi Clock Out'] }],
  in_select: [{ type: ParamType.One, modules: ['In Switch', 'Audio In Switch', 'Audio Out Switch'] }],
  sensitivity: [{ type: ParamType.Unknown, modules: ['Onset Detector', 'Env Filter'] }],
  play: [{ type: ParamType.One, modules: ['Rhythm', 'CV Loop'] }],
  trigger_in: [{ type: ParamType.One, modules: ['Random', 'Midi PC Out'] }],
  direct: [{ type: ParamType.One, modules: ['Tremolo', 'Flanger', 'Chorus', 'Vibrato', 'Univibe'] }],
  depth: [{ type: ParamType.One, modules: ['Tremolo', 'Univibe'] }],
  feedback: [{ type: ParamType.Unknown, modules: ['Delay w/ Mod', 'Ping Pong Delay', 'Reverse Delay'] }],
  mod_rate: [{ type: ParamType.Time5, modules: ['Delay w/ Mod', 'Ping Pong Delay', 'Diffuser'] }],
  mod_depth: [{ type: ParamType.Unknown, modules: ['Delay w/ Mod', 'Ping Pong Delay'] }],
  in: [{ type: ParamType.One, modules: ['UI Button', 'Logic Gate'] }],
  pan: [{ type: ParamType.Pan, modules: ['Audio Panner', 'Audio Mixer'] }],
  tone_tilt_eq: [{ type: ParamType.Unknown, modules: ['Flanger', 'Chorus'] }],
  lpf_freq: [{ type: ParamType.Unknown, modules: ['Hall Reverb', 'Room Reverb'] }],

  // Single use
  out_select: [{ type: ParamType.Ignored, modules: ['Out Switch'] }],
  alias_amount: [{ type: ParamType.Hz, modules: ['Aliaser'] }],
  step: [{ type: ParamType.Step, modules: ['Sequencer'] }],
  queue_start: [{ type: ParamType.One, modules: ['Sequencer'] }],
  key_input_note: [{ type: ParamType.One, modules: ['Sequencer'] }],
  key_input_gate: [{ type: ParamType.One, modules: ['Sequencer'] }],
  cv_control: [{ type: ParamType.Unknown, modules: ['LFO'] }],
  tap_control: [{ type: ParamType.Unknown, modules: ['LFO'] }],
  swing_amount: [{ type: ParamType.Unknown, modules: ['LFO'] }],
  phase_input: [{ type: ParamType.Phase, modules: ['LFO'] }],
  phase_reset: [{ type: ParamType.One, modules: ['LFO'] }],
  retrigger: [{ type: ParamType.One, modules: ['ADSR'] }],
  delay: [{ type: ParamType.Env, modules: ['ADSR'] }],
  hold_attack_decay: [{ type: ParamType.Env, modules: ['ADSR'] }],
  decay: [{ type: ParamType.Env, modules: ['ADSR'] }],
  sustain: [{ type: ParamType.Env, modules: ['ADSR'] }],
  hold_sustain_release: [{ type: ParamType.Env, modules: ['ADSR'] }],
  level_control: [{ type: ParamType.Db0, modules: ['VCA'] }],
  crushed_bits: [{ type: ParamType.Bits, modules: ['Bit Crusher'] }],
  trigger: [{ type: ParamType.One, modules: ['Sample and Hold'] }],
  modulation_in: [{ type: ParamType.Time16, modules: ['Delay Line'] }],
  rise_time: [{ type: ParamType.Unknown, modules: ['Env Follower'] }],
  fall_time: [{ type: ParamType.Unknown, modules: ['Env Follower'] }],
  note: [{ type: ParamType.Note, modules: ['Keyboard'] }],
  quant_steps: [{ type: ParamType.Steps, modules: ['Steps'] }],
  slew_rate: [{ type: ParamType.Unknown, modules: ['Slew Limiter'] }],
  rising_lag: [{ type: ParamType.Unknown, modules: ['Slew Limiter'] }],
  falling_lag: [{ type: ParamType.Unknown, modules: ['Slew Limiter'] }],
  ratio: [{ type: ParamType.Unknown, modules: ['Compressor'] }],
  q: [{ type: ParamType.Q, modules: ['Multi Filter'] }],
  high_eq: [{ type: ParamType.Db8, modules: ['Plate Reverb'] }],
  filter_gain: [{ type: ParamType.Db0, modules: ['All Pass Filter'] }],
  key: [{ type: ParamType.Unknown, modules: ['Quantizer'] }],
  scale: [{ type: ParamType.Unknown, modules: ['Quantizer'] }],
  control_in: [{ type: ParamType.Unknown, modules: ['Phaser'] }],
  restart_playback: [{ type: ParamType.One, modules: ['Looper'] }],
  stop_play: [{ type: ParamType.One, modules: ['Looper'] }],
  rec_start_stop: [{ type: ParamType.One, modules: ['Rhythm'] }],
  rhythm_in: [{ type: ParamType.One, modules: ['Rhythm'] }],
  loop_length: [{ type: ParamType.Time31, modules: ['Looper'] }],
  reverse_playback: [{ type: ParamType.One, modules: ['Looper'] }],
  low_shelf: [{ type: ParamType.Unknown, modules: ['Tone Control'] }],
  mid_gain: [{ type: ParamType.Unknown, modules: ['Tone Control'] }],
  mid_freq: [{ type: ParamType.Unknown, modules: ['Tone Control'] }],
  high_shelf: [{ type: ParamType.Unknown, modules: ['Tone Control'] }],
  value: [{ type: ParamType.One, modules: ['Value'] }],
  playback_speed: [{ type: ParamType.Unknown, modules: ['CV Loop'] }],
  stop_position: [{ type: ParamType.Unknown, modules: ['CV Loop'] }],
  restart_loop: [{ type: ParamType.One, modules: ['CV Loop'] }],
  time_constant: [{ type: ParamType.Unknown, modules: ['CV Filter'] }],
  rise_constant: [{ type: ParamType.Unknown, modules: ['CV Filter'] }],
  fall_constant: [{ type: ParamType.Unknown, modules: ['CV Filter'] }],
  reset_in: [{ type: ParamType.Unknown, modules: ['Clock Divider'] }],
  modifier: [{ type: ParamType.Unknown, modules: ['Clock Divider'] }],
  dividend: [{ type: ParamType.Unknown, modules: ['Clock Divider'] }],
  divisor: [{ type: ParamType.Unknown, modules: ['Clock Divider'] }],
  cv_positive_input: [{ type: ParamType.Unknown, modules: ['Comparator'] }],
  cv_negative_input: [{ type: ParamType.Unknown, modules: ['Comparator'] }],
  side_gain: [{ type: ParamType.Db40, modules: ['Stereo Spread'] }],
  pitch_shift: [{ type: ParamType.Pitch, modules: ['Pitch Shifter'] }],
  note_in: [{ type: ParamType.NoteNum, modules: ['Midi Note Out'] }],
  velocity_in: [{ type: ParamType.One, modules: ['Midi Note Out'] }],
  cc: [{ type: ParamType.Midi, modules: ['Midi CC Out'] }],
  pc: [{ type: ParamType.Midi, modules: ['Midi PC Out'] }],
  decay_feedback: [{ type: ParamType.Unknown, modules: ['Ghostverb'] }],
  regen: [{ type: ParamType.Unknown, modules: ['Flanger'] }],
  min_freq: [{ type: ParamType.Unknown, modules: ['Env Filter'] }],
  max_freq: [{ type: ParamType.Unknown, modules: ['Env Filter'] }],
  filter_q: [{ type: ParamType.Unknown, modules: ['Env Filter'] }],
  size: [{ type: ParamType.ModSamples, modules: ['Diffuser'] }],
  mod_width: [{ type: ParamType.ModSamples, modules: ['Diffuser'] }],
  grain_size: [{ type: ParamType.Unknown, modules: ['Granular'] }],
  grain_position: [{ type: ParamType.Unknown, modules: ['Granular'] }],
  density: [{ type: ParamType.One, modules: ['Granular'] }],
  texture: [{ type: ParamType.One, modules: ['Granular'] }],
  freeze: [{ type: ParamType.One, modules: ['Granular'] }],
  tap_cv_control: [{ type: ParamType.One, modules: ['Midi Clock Out'] }],
  sent: [{ type: ParamType.One, modules: ['Midi Clock Out'] }],
  send_position: [{ type: ParamType.One, modules: ['Midi Clock Out'] }],
  song_position: [{ type: ParamType.Song, modules: ['Midi Clock Out'] }],
  min_time: [{ type: ParamType.Unknown, modules: ['Tap to CV'] }],
  max_time: [{ type: ParamType.Unknown, modules: ['Tap to CV'] }],
  level: [{ type: ParamType.One, modules: ['Euro Headphone Amp'] }],
  sample_playback: [{ type: ParamType.One, modules: ['Sampler'] }],
  direction: [{ type: ParamType.One, modules: ['Sampler'] }],
  start: [{ type: ParamType.Unknown, modules: ['Sampler'] }],
  length: [{ type: ParamType.Unknown, modules: ['Sampler'] }],
  bypass: [{ type: ParamType.Ignored, modules: ['Device Control'] }],
  aux: [{ type: ParamType.Ignored, modules: ['Device Control'] }],
  performance: [{ type: ParamType.Ignored, modules: ['Device Control'] }],
  atten: [{ type: ParamType.Norm, modules: ['CV Mixer'] }],
  tap_ratio: [{ type: ParamType.Unknown, modules: ['Reverse Delay'] }],
  pitch: [{ type: ParamType.Unknown, modules: ['Reverse Delay'] }],
}

export function getParamType(blockName: string, module: ModuleSpec): ParamType {
  const name = blockName.replace(/_\d+$/, '')
  const value = TYPE_MAP[name]

  if (value.length === 1) {
    return value[0].type
  }

  return <ParamType> value?.find((set) => set.modules.includes(module.name))?.type
}
