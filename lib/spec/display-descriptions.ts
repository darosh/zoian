export const DESCRIPTIONS = [
  'The State Variable Filter will resonate and cutoff around a set frequency.',
  'Connect audio from the outside world into the grid.\nThis could be a guitar, bass, synth module, computer Audio, etc',
  'Connect audio from your ZOIA into the outside world.\nConnect to your amplifier, a DI box, your audio interface, etc.\nAn optional gain control lets you tweak the output level.',
  'Aliaser produces samples of incoming audio and compares them against each other to find imperfections.\nThese imperfections become the outgoing audio.\nAs sample count grows, so too does the thickness of the outgoing sound.\nThis effect is a signal hog so be sure to boost your connection strengths incoming and outgoing.\nTry connecting a LFO or envelope follower to the alias amount.',
  'The sequencer allows you to create a number of "steps" (1-32) that can be cycled through,\nand each step can be used to send a CV value out of that tracks output.\nThe sequencer can have up to 8 tracks, each with their own unique output.',
  "The Low Frequency Oscillator is one of the workhorse modules of the ZOIA.\nThis will generate CV in the waveform and range of your choosing.\nConnect it to a sequencer to cycle through steps, to an audio effect to\nswing it's parameters around, or to any outboard piece of gear through a\nMIDI or CV interface module.\nThe connection strength you enter at the output will determine the maximum\nsweep of the LFO.",
  "The Attack Decay Sustain Release module is what gives a note generated\nfrom an oscillator a natural sounding envelope when played from a keyboard.\nConnect your oscillator or other audio source to the input of a VCA,\nand connect the CV output of the ADSR to the CV input on the VCA.\nConnect the keyboard or MIDI note gate out to the CV input of the ADSR\nand you've got yourself a simple synthesizer!\nTweak the values to taste, or connect them to other CV inputs for experimentation.\nUse the optional retrigger input to restart the envelope around a note\nthat is played before the ADSR is released.",
  'The Voltage Controlled Amplifier module will interpret incoming CV at the\nlevel control and boost or cut the volume.\nConnect an ADSR to create a natural sounding envelope for an oscillator passing through.\nConnect an LFO to create a tremolo effect.\nOr connect an expression pedal module or MIDI input for an external volume control.',
  'Takes one audio input and mathematically multiplies it with the other.\nThis produces a ring mod/vocoder-like effect.\nThis module likes hot signals to be sure to bump the connection strengths.\nRemember that silence at any one of the inputs will result in silence at the output!',
  'Bit Crusher produces distortion by reducing audio bandwidth by a set number of bits.\nDistortion becomes audible around 20 bits reduced.\nThis effect can get noisy so try it with a gate.',
  'Sample and Hold will take the CV value at the input and hold it in place\nat the output until triggered to look again at the input and update the output.\nConnect a LFO to the trigger to convert smooth changes in CV into stepped changes in CV.\nThe speed of the LFO will determine the perceived resolution of the CV output.',
  'The OD & Distortion module provides classic overdrive and distortion tones.',
  'Envelope Follower will interpret an incoming audio signal as a CV signal\nbased on its signal strength.\nUse this to trigger filter sweeps, audio effects parameters, LFO rates, etc.\nThe connection strength can act as a sensitivity control.',
  'The Delay Line is a simple module that takes audio at the input and\ndelays it by a set amount of time.\nThere is no dry signal, there are no repeats.\nYou can create repeats by connecting the output back to the input,\nusing the connection strength to adjust number of repeats.',
  'Generates an audio signal in the waveform of your choice.\nConnect a MIDI device, keyboard module, sequencer, pitch detector,\nLFO, or any CV source to select the frequency or note the oscillator will play.\nYou can modulate the frequency or pulse width with the optional parameters.\nNegative CV inputs (from -1 to 0) will generate sub-bass frequencies\nbetween 0.027Hz and 27.49Hz. Be careful!',
  'Turns a grid button into a button you can push to send a CV signal.\nTap in a tempo, open up a VCA, trigger a sequencer, or anything else.\nThe grid is your oyster!',
  'Turns grid buttons into a keyboard you can connect to an oscillator and play.\nNo external MIDI controller necessary!\nTune each keyboard button using the knob to have it play your desired note.',
  'Inverts the incoming CV.\nFor example, a CV input of 1 will output as -1.\nAn input of 0.2 will output as -0.2.',
  'Steps will interpret incoming changes in upward CV as a tempo, split the wave\ncycle into a set number of steps, and then send the CV present at the input\nduring each step to the output.\nYou can use this to convert a nice smooth LFO and reduce its resolution into steps.',
  'Slew Limiter is similar in behaviour to CV Filter except that the rate of\nchange in changes of CV happen linearly instead of logarithmically.\nThis is the classic portamento, and can be used anywhere CV changes occur\nto give them a different feel.\nTry using an unlinked Slew Limiter with a stomp switch module to give more\nexpression pedal-like behaviour to your stomp switch.',
  'Connect your MIDI keyboard controller to the ZOIA.\nConnect the note out to an oscillator to have it play your note,\nand connect the gate out to an ADSR (connected to a VCA) for a natural envelope.',
  'Connect encoder knobs and sliders on a MIDI interface.\nTake note of the outgoing CC number of each control and enter it into the controller option.',
  "Multiply will take the CV signal present at each input and multiply\nthem together at the output.\nIn this way you can use one CV source to amplify, tame, or modulate another.\nRemember that a value of 0 at any input will result in 0 at the output.\nIt's math!",
  "Compression is a vastly useful audio tool that controls your signal level\naccording to changes in input level.\nYou can create natural reductions in gain to help things mix better, help\ntame or enhance transients in synth or instrument signals, etc.\nThe optional stereo side will trigger the module's functions in unison on both\nchannels, creating true stereo compression.",
  'A general purpose filter with gain, frequency, and Q controls.\nConfigurable as a high pass, low pass, band pass, bell, hi shelf, or low shelf.',
  'Bask in the ebb and flow of steel molecules as they vibrate with the warm vintage\nvibe of so many classic recordings.',
  'Delays internal audio signal by N buffer(s).\nThis module is inaudible, but useful anywhere you need to line up\ninternal parallel audio connections precisely.',
  'All Pass Filter passes through all frequencies at equal gain,\nbut changes phase relationship between them.',
  'Quantizer will interpret incoming CV and send its nearest equivalent note as a CV output.',
  'Set to stun, Phaser shifts the phase over a set quantity of stages and\nsweeps the frequency of these poles at a set rate.\nAn optional stereo channel rounds out the list of features.',
  'The Looper module allows you to record, overdub, and play back incoming audio,\nforwards or backwards, at the speed of your choice (pitch shifted).\nGet loopy!',
  'In Switch takes a selected quantity of CV inputs and allows you\nto switch between them to a single CV output.\nYou can use this to select between LFOs to a CV source, external CV modules,\nor use in conjunction with the CV out switch to choose between ADSRs\nor other CV module chains',
  'Out Switch takes a CV input and routes it between a set quantity of CV outputs.\nYou can use it to select which sequencers, ADSRs, or tap tempos to send triggers to, etc',
  "Audio In Switch takes a selected quantity of audio inputs and allows you\nto switch between them to a single output.\nYou can use this to select between instruments at your input jacks,\nuse it in conjunction with the Audio Out Switch to select between\neffects chains, or use it anywhere you'd like to be able to select\nbetween incoming audio sources using CV.",
  "Audio Out Switch takes an audio input and routes it between a set\nquantity of audio outputs.\nYou can use it at your output jacks to select between amplifiers\nor mixer channels, use it in conjunction with the Audio In Switch to\nselect between effects chains, or use it anywhere you'd like to be able\nto select an outgoing audio path using CV.",
  "Many MIDI keyboards have an aftertouch feature that can be triggered\nby pressing down on a note after it's fully depressed.\nYou can use after touch to trigger a little extra pizazz in your sound.",
  'Onset Detector looks for incoming audio signal and generates a CV trigger at the peaks.\nUse a regular audio source to advance a sequencer, tap a tempo, etc',
  'Rhythm will take an incoming CV signal, interpret it as a series of triggers,\nrecord those triggers and play them back at the output.',
  'Generates white noise from a single button.\nUse the strength of your connection as a level control.\nHelpful in connection with VCAs and ADSRs in creating drum sounds, etc.',
  'Random will generate numbers continuously or when triggered with the option trigger in.\nConnect an LFO to the trigger in to get regularly updated random numbers.\nTry it with a CV in switch to toggle some randomness into  your life.',
  "A standard in studio audio tools, gate can also be used as the key ingredient\nin gated fuzz tones.\nUse it to filter out noise from an audio source, or to cut the end off\nof a reverb's decay, thus creating the classic gated reverb sound.\nMake sure to experiment with the sidechain input!",
  "Up and down, side to side.\nTremolo helps your smile get wide.\nSet speed and depth and tap in a tempo if you like.\nIf you'd like a tremolo effect with more control, try creating one using\nthe VCA or Audio Panner along with LFOs and various other CV tools to get radical!",
  'Tone Control is a 3 or 4 band tone control.\nUse this in conjunction with Distortion, Delay w/Mod, Reverb, or even\na clean sound to fundamentally change its character.',
  'Delay is one of the classic delay effects.\nDelay w/Mod differs from the Delay Line module found in Audio Out in\nthat it runs a dry signal alongside the wet, has a feedback section,\nand a modulation section.\nSet the delay time either by tap or rotary/CV input.\nOptional stereo outputs round out the list of features.\nYou can change the character of the delay effect with the "type"\noption, and/or by setting your mix to wet only, adding tone control\nand other effects to the output, and connecting your audio source\ndirectly to your output (bypassing the delay module) to act as the dry signal.',
  'Use this module to connect a stomp switch to other modules.\nThis can be any of ZOIA\'s 3 stomp switches or an external one.\nIf using an external, remember to set it up in the Config Menu.\nOnce placed, the Scroll and Bypass stomp switches must be "switched to"\nby holding them both on together for 2 seconds, this will allow them to\nfunction in the modules instead of as ZOIA\'s main user interface.\nHold again for 2 seconds to switch back.',
  'Value allows you to connect to multiple modules and adjust their\nparameters simultaneously from one CV adjustment at the input.',
  'CV Delay will take incoming CV and delay it in time by a set amount.',
  'CV Loop functions similar to an audio looper except records patterns\nof CV signal instead of audio.\nYou can record and play back snippets of LFOs, sequences, changes in CV\nor MIDI control etc.',
  'CV Filter dictates the length of time a CV output will take to\nrespond to a change in CV input, determined by the time constant.\nThe CV change occurs logarithmically for a nice smooth transition.\nUse this module in series with a MIDI/keyboard note to add portamento\nto your synth voice.\nYou can also use this module to vary the shape of an LFO waveform or connect\nto a stomp switch to produce a long slow change in an audio effect.',
  'Clock Divider module will detect tempo of incoming CV upward changes,\ndivide it by a user determined ratio, and output CV triggers at the resulting tempo.\nThis can be a handy way of getting a tap tempo from a slightly irregular waveform.',
  "Comparator is a logic module that will switch CV on if positive input\nis equal to or greater than negative input, and off if positive input is\nless than negative input.\nOff can be defined as 0 or -1 by the output range.\nThis can be useful if you'd like to have something happen, but only above\na certain threshold.",
  'CV Rectify will interpret incoming CV from -1 to 1 and "flip" the negative\nvalues into positive values equidistant from 0.',
  'Creates a very short CV pulse (value of 1) on detection of upward CV input.\nThis is useful in creating a tap tempos from regular or irregular CV waveforms,\ntriggering sequencers or ADSRs at specific times, etc.',
  'Stereo Spread will take one or two channels and enhance their stereo field.\nThis is generally used right before an audio output module but, as always,\nfeel free to experiment!',
  'Connect your expression pedal or a control voltage signal from an external source.\nRemember to set CPort to either exp or cv in the Config Menu.',
  'This module interprets internal CV and sends it down the ring of a 1/4"\nTRS connector in the control port as a standard CV signal of 0-5 volts.\nRemember to set CPort to cv in the Config Menu.',
  'UI Button can function in a couple different ways.\nIt can show you a specific colour at a specific brightness based on the\nsetting of or CV sent to the input.\nIt can also act as a pushbutton with output enabled.\nTo use as a visualizing pixel, connect CV and send the following values:\nEXTENDED RANGE:\nRed: 0 - 0.049 (max bright 0.0375),\nOrange: 0.05 - 0.099 (max bright 0.0875),\nMango: 0.10 - 0.149 (max bright 0.1375),\nYellow: 0.15 - 0.199 (max bright 0.1875),\nLime: 0.20 - 0.249 (max bright 0.2375),\nGreen: 0.25 - 0.299 (max bright 0.2875),\nSurf: 0.30 - 0.349 (max bright 0.3375),\nAqua: 0.35 - 0.399 (max bright 0.3875),\nSky: 0.40 - 0.449 (max bright 0.4375),\nBlue: 0.45 - 0.499 (max bright 0.4875),\nPurple: 0.50 - 0.549 (max bright 0.5375),\nMagenta: 0.55 - 0.599 (max bright 0.5875),\nPink: 0.60 - 0.649 (max bright 0.6375),\nPeach: 0.65 - 0.699 (max bright 0.6875),\nWhite: 0.70 - 0.749 (max bright 0.7375).\nBASIC RANGE:\nBlue = 0 to 0.099 (0.74 max brightness),\nGreen = 0.1 to 0.199 (0.174 max brightness),\nRed = 0.2 to 0.299 (0.274 max brightness),\nYellow = 0.3 to 0.399 (0.374 max brightness),\nCyan = 0.4 to 0.499 (0.474 max brightness),\nMagenta = 0.5 to 0.599 (0.574 max brightness),\nWhite = 0.6 to 0.699 (0.6 to 0.674 brightness).',
  'Audio Panner takes either one or two input channels and pans them between two outputs.\nConnect an LFO for a stereo tremolo effect.',
  'Pitch Detector interprets the pitch of a connected audio signal as a CV note output,\nwhich can be sent to an oscillator or quantizer.\nYou can affect the tracking by changing the connection strength between\nthe audio source and the audio input, and transpose which note the oscillator\nwill generate using the connection strength to the oscillator.\nClick knob to toggle display between frequency in Hz and note.',
  "Pitch Shifter transposes the pitch of incoming audio.\nClick the knob on the pitch shift parameter to cycle views of\nCV value, semitones, or cents.\nConnect an LFO to produce a vibrato effect, or connect whatever you'd like!",
  "Send MIDI notes out to external MIDI enabled gear through ZOIA's MIDI outputs.",
  "Send Control Change messages to external MIDI enabled gear through ZOIA's MIDI outputs.",
  "Send Program Change messages to external MIDI enabled gear.\nSelect the Program Change value and send a CV signal to trigger\nin to send message through ZOIA's MIDI outputs.",
  'Bit Modulator takes one audio input and compares it against the other,\ncreating an unholy glitchy combination of both sounds at the output.\nChoose between 3 different logic flavours with the "type" option.\nWhen taking audio from an external source, it\'s recommended to put a gate before the input.',
  'Audio Balance mixes an output from 2 inputs.\nYou can run this module either mono or stereo.',
  'The Inverter module takes incoming audio signal and inverts the\nsound wave 180 degrees out of phase.\nThis module is inaudible unless you have a phase related problem\nyou are trying to solve, in which case it can be very audible.\nBe sure to put a 1 Buffer Delay module into your "dry" side to\nline up the Inverter in time for proper phase cancellation.',
  'The Fuzz module provides gnarly fuzz tones for your sonic enjoyment.',
  'A spooky, ghostly reverb sound akin to the Ghost mode found in the Empress Reverb.\nScare the crap out of all your friends!',
  'A versatile guitar cabinet simulator.',
  "ZOIA's Flanger module is borrowed right from the Empress Nebulus.\nThis quite versatile flanger encompasses lots of comb filtering territory,\nbut don't hesitate to build flange tones yourself using LFOs and delay lines!",
  'The classic chorus effect.\nA nice sounding, fairly standard chorus.\nGet wackier sounds from it by using CV direct, or build\nyour own from LFOs and delay lines!',
  "Vibrato is your typical pitch bending, wet only sound you'd find on\nsuch classic units as the Empress Nebulus, just to name one.\nGet bendy!",
  'Get your quack on!\nThis fully featured envelope filter has everything you\nneed to tune in that perfect envelope filter and get funky.\nGreat on guitar, bass, or anything else!',
  "A gnarly ring modulation effect.\nA robot's nightmare, a tweaker's delight!",
  "It's like you're there, looking up at the pulpit, with the warm sun\ncasting in beams of coloured light from the stained glass windows.\nYou're in reverb heaven, now.",
  'Ping Pong Delay is almost identical to the Delay w/ Mod except for one key aspect:\nthe delay repeats ping pong from left to right across stereo outputs.\nWhen stereo inputs are selected, one input will ping while the other pongs,\nfollowed by a pong while the other pings into the opposite and then correct outputs.',
  'Audio Mixer functions like a stripped down mixing console,\nwhere gain is your channel fader and you can place an optional pan control.\nMix up to 8 channels, in mono or stereo.',
  "This is essentially a latching CV switch with an output of 0 or 1.\nWhen the input sees an upward CV change, the flip flop is triggered to\nchange it's output state from 0 to 1 at the next upward change in CV,\nwhich must occur after a downward change in CV.\nSo, the flip flop changes from 0 to 1 at every other upward change in CV.",
  "Diffuser spreads your signal across the galaxy like so many shimmering little stars.\nOn it's own it sounds like a modulated slapback delay with no dry signal,\nbut it can be used to construct many a tonal/atonal masterpiece.",
  'A straightforward CPU friendly reverb sound to add some smoosh to heavier workload patches.',
  "Well, you're cooped up in your little room.\nBut that's okay, because you've got some tasty room reverb to swim around in.\nDon't worry, somebody will come get you out someday.",
  'Puts a coloured block on the grid.\nThe brightness can be controlled by a cv signal or an audio signal.\nPixel is a simple, elegant way to create a more visually\ninteractive user interface for your patch.',
  'Connect MIDI clock to sync your patches to the outside world.',
  'Granular breaks up incoming audio into tiny little grains and\nspits them back out in the quantity and shape of your choosing.\nGo from modest textures to completely unrecognizable oscillations.\nGranular can also be used as a granular delay by creating a feedback\npath from the output back to the input...',
  "Generate MIDI clock to sync outside devices to your ZOIA.\nClock sends directly to ZOIA's MIDI output.",
  'Outputs a CV value proportional to the tap tempo input.',
  'Collects MIDI data from pitch bend wheel on keyboards,\ncan be applied to oscillator frequency in parallel with MIDI note data,\nor used in other ways.',
  '',
  '',
  '',
  '',
  '',
  '',
  'Connect audio from the outside world into the grid.\nThis could be a guitar, bass, synth module, computer Audio, etc',
  'Connect audio from the outside world into the grid.\nThis could be a guitar, bass, synth module, computer Audio, etc',
  'Connect audio from your ZOIA into the outside world.\nConnect to your amplifier, a DI box, your audio interface, etc.',
  'Connect audio from your ZOIA into the outside world.\nConnect to your amplifier, a DI box, your audio interface, etc.',
  'Turns a grid button into a button you can push to send a CV signal.\nTap in a tempo, open up a VCA, trigger a sequencer, or anything else.\nThe grid is your oyster!',
  'Turns a grid button into a button you can push to send a CV signal.\nTap in a tempo, open up a VCA, trigger a sequencer, or anything else.\nThe grid is your oyster!',
  '',
  '',
  '',
  'Load or record your favourite sample, chop it up, then play it back at any speed/pitch your heart desires. All samples must be mono or stereo PCM WAV files that are 10 minutes or less in length.',
  'Perform logical operations with CV inputs. Operations include: AND, OR, NOT, NOR, NAND, XOR, XNOR.',
  'An 8 channel CV Mixer and attenuverter.',
  '',
  'This delay effect lets you twist time with reversed, pitch shifted repeats.',
  'Classic vibe sound with some added versatility.',
]
