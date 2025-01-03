import{_ as k,D as V,M as I,o as D,k as A,q as T,V as x}from"./VTable-B80fo_Pu.js";import{T as O,V as f}from"./VDivider-Bgdxdkni.js";import{aA as S,au as M,az as i,av as e,at as s,aD as y,Y as p,aC as t,aB as u,f as b,ax as w}from"./index-DunNrXCI.js";const L=["The State Variable Filter will resonate and cutoff around a set frequency.",`Connect audio from the outside world into the grid.
This could be a guitar, bass, synth module, computer Audio, etc`,`Connect audio from your ZOIA into the outside world.
Connect to your amplifier, a DI box, your audio interface, etc.
An optional gain control lets you tweak the output level.`,`Aliaser produces samples of incoming audio and compares them against each other to find imperfections.
These imperfections become the outgoing audio.
As sample count grows, so too does the thickness of the outgoing sound.
This effect is a signal hog so be sure to boost your connection strengths incoming and outgoing.
Try connecting a LFO or envelope follower to the alias amount.`,`The sequencer allows you to create a number of "steps" (1-32) that can be cycled through,
and each step can be used to send a CV value out of that tracks output.
The sequencer can have up to 8 tracks, each with their own unique output.`,`The Low Frequency Oscillator is one of the workhorse modules of the ZOIA.
This will generate CV in the waveform and range of your choosing.
Connect it to a sequencer to cycle through steps, to an audio effect to
swing it's parameters around, or to any outboard piece of gear through a
MIDI or CV interface module.
The connection strength you enter at the output will determine the maximum
sweep of the LFO.`,`The Attack Decay Sustain Release module is what gives a note generated
from an oscillator a natural sounding envelope when played from a keyboard.
Connect your oscillator or other audio source to the input of a VCA,
and connect the CV output of the ADSR to the CV input on the VCA.
Connect the keyboard or MIDI note gate out to the CV input of the ADSR
and you've got yourself a simple synthesizer!
Tweak the values to taste, or connect them to other CV inputs for experimentation.
Use the optional retrigger input to restart the envelope around a note
that is played before the ADSR is released.`,`The Voltage Controlled Amplifier module will interpret incoming CV at the
level control and boost or cut the volume.
Connect an ADSR to create a natural sounding envelope for an oscillator passing through.
Connect an LFO to create a tremolo effect.
Or connect an expression pedal module or MIDI input for an external volume control.`,`Takes one audio input and mathematically multiplies it with the other.
This produces a ring mod/vocoder-like effect.
This module likes hot signals to be sure to bump the connection strengths.
Remember that silence at any one of the inputs will result in silence at the output!`,`Bit Crusher produces distortion by reducing audio bandwidth by a set number of bits.
Distortion becomes audible around 20 bits reduced.
This effect can get noisy so try it with a gate.`,`Sample and Hold will take the CV value at the input and hold it in place
at the output until triggered to look again at the input and update the output.
Connect a LFO to the trigger to convert smooth changes in CV into stepped changes in CV.
The speed of the LFO will determine the perceived resolution of the CV output.`,"The OD & Distortion module provides classic overdrive and distortion tones.",`Envelope Follower will interpret an incoming audio signal as a CV signal
based on its signal strength.
Use this to trigger filter sweeps, audio effects parameters, LFO rates, etc.
The connection strength can act as a sensitivity control.`,`The Delay Line is a simple module that takes audio at the input and
delays it by a set amount of time.
There is no dry signal, there are no repeats.
You can create repeats by connecting the output back to the input,
using the connection strength to adjust number of repeats.`,`Generates an audio signal in the waveform of your choice.
Connect a MIDI device, keyboard module, sequencer, pitch detector,
LFO, or any CV source to select the frequency or note the oscillator will play.
You can modulate the frequency or pulse width with the optional parameters.
Negative CV inputs (from -1 to 0) will generate sub-bass frequencies
between 0.027Hz and 27.49Hz. Be careful!`,`Turns a grid button into a button you can push to send a CV signal.
Tap in a tempo, open up a VCA, trigger a sequencer, or anything else.
The grid is your oyster!`,`Turns grid buttons into a keyboard you can connect to an oscillator and play.
No external MIDI controller necessary!
Tune each keyboard button using the knob to have it play your desired note.`,`Inverts the incoming CV.
For example, a CV input of 1 will output as -1.
An input of 0.2 will output as -0.2.`,`Steps will interpret incoming changes in upward CV as a tempo, split the wave
cycle into a set number of steps, and then send the CV present at the input
during each step to the output.
You can use this to convert a nice smooth LFO and reduce its resolution into steps.`,`Slew Limiter is similar in behaviour to CV Filter except that the rate of
change in changes of CV happen linearly instead of logarithmically.
This is the classic portamento, and can be used anywhere CV changes occur
to give them a different feel.
Try using an unlinked Slew Limiter with a stomp switch module to give more
expression pedal-like behaviour to your stomp switch.`,`Connect your MIDI keyboard controller to the ZOIA.
Connect the note out to an oscillator to have it play your note,
and connect the gate out to an ADSR (connected to a VCA) for a natural envelope.`,`Connect encoder knobs and sliders on a MIDI interface.
Take note of the outgoing CC number of each control and enter it into the controller option.`,`Multiply will take the CV signal present at each input and multiply
them together at the output.
In this way you can use one CV source to amplify, tame, or modulate another.
Remember that a value of 0 at any input will result in 0 at the output.
It's math!`,`Compression is a vastly useful audio tool that controls your signal level
according to changes in input level.
You can create natural reductions in gain to help things mix better, help
tame or enhance transients in synth or instrument signals, etc.
The optional stereo side will trigger the module's functions in unison on both
channels, creating true stereo compression.`,`A general purpose filter with gain, frequency, and Q controls.
Configurable as a high pass, low pass, band pass, bell, hi shelf, or low shelf.`,`Bask in the ebb and flow of steel molecules as they vibrate with the warm vintage
vibe of so many classic recordings.`,`Delays internal audio signal by N buffer(s).
This module is inaudible, but useful anywhere you need to line up
internal parallel audio connections precisely.`,`All Pass Filter passes through all frequencies at equal gain,
but changes phase relationship between them.`,"Quantizer will interpret incoming CV and send its nearest equivalent note as a CV output.",`Set to stun, Phaser shifts the phase over a set quantity of stages and
sweeps the frequency of these poles at a set rate.
An optional stereo channel rounds out the list of features.`,`The Looper module allows you to record, overdub, and play back incoming audio,
forwards or backwards, at the speed of your choice (pitch shifted).
Get loopy!`,`In Switch takes a selected quantity of CV inputs and allows you
to switch between them to a single CV output.
You can use this to select between LFOs to a CV source, external CV modules,
or use in conjunction with the CV out switch to choose between ADSRs
or other CV module chains`,`Out Switch takes a CV input and routes it between a set quantity of CV outputs.
You can use it to select which sequencers, ADSRs, or tap tempos to send triggers to, etc`,`Audio In Switch takes a selected quantity of audio inputs and allows you
to switch between them to a single output.
You can use this to select between instruments at your input jacks,
use it in conjunction with the Audio Out Switch to select between
effects chains, or use it anywhere you'd like to be able to select
between incoming audio sources using CV.`,`Audio Out Switch takes an audio input and routes it between a set
quantity of audio outputs.
You can use it at your output jacks to select between amplifiers
or mixer channels, use it in conjunction with the Audio In Switch to
select between effects chains, or use it anywhere you'd like to be able
to select an outgoing audio path using CV.`,`Many MIDI keyboards have an aftertouch feature that can be triggered
by pressing down on a note after it's fully depressed.
You can use after touch to trigger a little extra pizazz in your sound.`,`Onset Detector looks for incoming audio signal and generates a CV trigger at the peaks.
Use a regular audio source to advance a sequencer, tap a tempo, etc`,`Rhythm will take an incoming CV signal, interpret it as a series of triggers,
record those triggers and play them back at the output.`,`Generates white noise from a single button.
Use the strength of your connection as a level control.
Helpful in connection with VCAs and ADSRs in creating drum sounds, etc.`,`Random will generate numbers continuously or when triggered with the option trigger in.
Connect an LFO to the trigger in to get regularly updated random numbers.
Try it with a CV in switch to toggle some randomness into  your life.`,`A standard in studio audio tools, gate can also be used as the key ingredient
in gated fuzz tones.
Use it to filter out noise from an audio source, or to cut the end off
of a reverb's decay, thus creating the classic gated reverb sound.
Make sure to experiment with the sidechain input!`,`Up and down, side to side.
Tremolo helps your smile get wide.
Set speed and depth and tap in a tempo if you like.
If you'd like a tremolo effect with more control, try creating one using
the VCA or Audio Panner along with LFOs and various other CV tools to get radical!`,`Tone Control is a 3 or 4 band tone control.
Use this in conjunction with Distortion, Delay w/Mod, Reverb, or even
a clean sound to fundamentally change its character.`,`Delay is one of the classic delay effects.
Delay w/Mod differs from the Delay Line module found in Audio Out in
that it runs a dry signal alongside the wet, has a feedback section,
and a modulation section.
Set the delay time either by tap or rotary/CV input.
Optional stereo outputs round out the list of features.
You can change the character of the delay effect with the "type"
option, and/or by setting your mix to wet only, adding tone control
and other effects to the output, and connecting your audio source
directly to your output (bypassing the delay module) to act as the dry signal.`,`Use this module to connect a stomp switch to other modules.
This can be any of ZOIA's 3 stomp switches or an external one.
If using an external, remember to set it up in the Config Menu.
Once placed, the Scroll and Bypass stomp switches must be "switched to"
by holding them both on together for 2 seconds, this will allow them to
function in the modules instead of as ZOIA's main user interface.
Hold again for 2 seconds to switch back.`,`Value allows you to connect to multiple modules and adjust their
parameters simultaneously from one CV adjustment at the input.`,"CV Delay will take incoming CV and delay it in time by a set amount.",`CV Loop functions similar to an audio looper except records patterns
of CV signal instead of audio.
You can record and play back snippets of LFOs, sequences, changes in CV
or MIDI control etc.`,`CV Filter dictates the length of time a CV output will take to
respond to a change in CV input, determined by the time constant.
The CV change occurs logarithmically for a nice smooth transition.
Use this module in series with a MIDI/keyboard note to add portamento
to your synth voice.
You can also use this module to vary the shape of an LFO waveform or connect
to a stomp switch to produce a long slow change in an audio effect.`,`Clock Divider module will detect tempo of incoming CV upward changes,
divide it by a user determined ratio, and output CV triggers at the resulting tempo.
This can be a handy way of getting a tap tempo from a slightly irregular waveform.`,`Comparator is a logic module that will switch CV on if positive input
is equal to or greater than negative input, and off if positive input is
less than negative input.
Off can be defined as 0 or -1 by the output range.
This can be useful if you'd like to have something happen, but only above
a certain threshold.`,`CV Rectify will interpret incoming CV from -1 to 1 and "flip" the negative
values into positive values equidistant from 0.`,`Creates a very short CV pulse (value of 1) on detection of upward CV input.
This is useful in creating a tap tempos from regular or irregular CV waveforms,
triggering sequencers or ADSRs at specific times, etc.`,`Stereo Spread will take one or two channels and enhance their stereo field.
This is generally used right before an audio output module but, as always,
feel free to experiment!`,`Connect your expression pedal or a control voltage signal from an external source.
Remember to set CPort to either exp or cv in the Config Menu.`,`This module interprets internal CV and sends it down the ring of a 1/4"
TRS connector in the control port as a standard CV signal of 0-5 volts.
Remember to set CPort to cv in the Config Menu.`,`UI Button can function in a couple different ways.
It can show you a specific colour at a specific brightness based on the
setting of or CV sent to the input.
It can also act as a pushbutton with output enabled.
To use as a visualizing pixel, connect CV and send the following values:
EXTENDED RANGE:
Red: 0 - 0.049 (max bright 0.0375),
Orange: 0.05 - 0.099 (max bright 0.0875),
Mango: 0.10 - 0.149 (max bright 0.1375),
Yellow: 0.15 - 0.199 (max bright 0.1875),
Lime: 0.20 - 0.249 (max bright 0.2375),
Green: 0.25 - 0.299 (max bright 0.2875),
Surf: 0.30 - 0.349 (max bright 0.3375),
Aqua: 0.35 - 0.399 (max bright 0.3875),
Sky: 0.40 - 0.449 (max bright 0.4375),
Blue: 0.45 - 0.499 (max bright 0.4875),
Purple: 0.50 - 0.549 (max bright 0.5375),
Magenta: 0.55 - 0.599 (max bright 0.5875),
Pink: 0.60 - 0.649 (max bright 0.6375),
Peach: 0.65 - 0.699 (max bright 0.6875),
White: 0.70 - 0.749 (max bright 0.7375).
BASIC RANGE:
Blue = 0 to 0.099 (0.74 max brightness),
Green = 0.1 to 0.199 (0.174 max brightness),
Red = 0.2 to 0.299 (0.274 max brightness),
Yellow = 0.3 to 0.399 (0.374 max brightness),
Cyan = 0.4 to 0.499 (0.474 max brightness),
Magenta = 0.5 to 0.599 (0.574 max brightness),
White = 0.6 to 0.699 (0.6 to 0.674 brightness).`,`Audio Panner takes either one or two input channels and pans them between two outputs.
Connect an LFO for a stereo tremolo effect.`,`Pitch Detector interprets the pitch of a connected audio signal as a CV note output,
which can be sent to an oscillator or quantizer.
You can affect the tracking by changing the connection strength between
the audio source and the audio input, and transpose which note the oscillator
will generate using the connection strength to the oscillator.
Click knob to toggle display between frequency in Hz and note.`,`Pitch Shifter transposes the pitch of incoming audio.
Click the knob on the pitch shift parameter to cycle views of
CV value, semitones, or cents.
Connect an LFO to produce a vibrato effect, or connect whatever you'd like!`,"Send MIDI notes out to external MIDI enabled gear through ZOIA's MIDI outputs.","Send Control Change messages to external MIDI enabled gear through ZOIA's MIDI outputs.",`Send Program Change messages to external MIDI enabled gear.
Select the Program Change value and send a CV signal to trigger
in to send message through ZOIA's MIDI outputs.`,`Bit Modulator takes one audio input and compares it against the other,
creating an unholy glitchy combination of both sounds at the output.
Choose between 3 different logic flavours with the "type" option.
When taking audio from an external source, it's recommended to put a gate before the input.`,`Audio Balance mixes an output from 2 inputs.
You can run this module either mono or stereo.`,`The Inverter module takes incoming audio signal and inverts the
sound wave 180 degrees out of phase.
This module is inaudible unless you have a phase related problem
you are trying to solve, in which case it can be very audible.
Be sure to put a 1 Buffer Delay module into your "dry" side to
line up the Inverter in time for proper phase cancellation.`,"The Fuzz module provides gnarly fuzz tones for your sonic enjoyment.",`A spooky, ghostly reverb sound akin to the Ghost mode found in the Empress Reverb.
Scare the crap out of all your friends!`,"A versatile guitar cabinet simulator.",`ZOIA's Flanger module is borrowed right from the Empress Nebulus.
This quite versatile flanger encompasses lots of comb filtering territory,
but don't hesitate to build flange tones yourself using LFOs and delay lines!`,`The classic chorus effect.
A nice sounding, fairly standard chorus.
Get wackier sounds from it by using CV direct, or build
your own from LFOs and delay lines!`,`Vibrato is your typical pitch bending, wet only sound you'd find on
such classic units as the Empress Nebulus, just to name one.
Get bendy!`,`Get your quack on!
This fully featured envelope filter has everything you
need to tune in that perfect envelope filter and get funky.
Great on guitar, bass, or anything else!`,`A gnarly ring modulation effect.
A robot's nightmare, a tweaker's delight!`,`It's like you're there, looking up at the pulpit, with the warm sun
casting in beams of coloured light from the stained glass windows.
You're in reverb heaven, now.`,`Ping Pong Delay is almost identical to the Delay w/ Mod except for one key aspect:
the delay repeats ping pong from left to right across stereo outputs.
When stereo inputs are selected, one input will ping while the other pongs,
followed by a pong while the other pings into the opposite and then correct outputs.`,`Audio Mixer functions like a stripped down mixing console,
where gain is your channel fader and you can place an optional pan control.
Mix up to 8 channels, in mono or stereo.`,`This is essentially a latching CV switch with an output of 0 or 1.
When the input sees an upward CV change, the flip flop is triggered to
change it's output state from 0 to 1 at the next upward change in CV,
which must occur after a downward change in CV.
So, the flip flop changes from 0 to 1 at every other upward change in CV.`,`Diffuser spreads your signal across the galaxy like so many shimmering little stars.
On it's own it sounds like a modulated slapback delay with no dry signal,
but it can be used to construct many a tonal/atonal masterpiece.`,"A straightforward CPU friendly reverb sound to add some smoosh to heavier workload patches.",`Well, you're cooped up in your little room.
But that's okay, because you've got some tasty room reverb to swim around in.
Don't worry, somebody will come get you out someday.`,`Puts a coloured block on the grid.
The brightness can be controlled by a cv signal or an audio signal.
Pixel is a simple, elegant way to create a more visually
interactive user interface for your patch.`,"Connect MIDI clock to sync your patches to the outside world.",`Granular breaks up incoming audio into tiny little grains and
spits them back out in the quantity and shape of your choosing.
Go from modest textures to completely unrecognizable oscillations.
Granular can also be used as a granular delay by creating a feedback
path from the output back to the input...`,`Generate MIDI clock to sync outside devices to your ZOIA.
Clock sends directly to ZOIA's MIDI output.`,"Outputs a CV value proportional to the tap tempo input.",`Collects MIDI data from pitch bend wheel on keyboards,
can be applied to oscillator frequency in parallel with MIDI note data,
or used in other ways.`,"","","","","","",`Connect audio from the outside world into the grid.
This could be a guitar, bass, synth module, computer Audio, etc`,`Connect audio from the outside world into the grid.
This could be a guitar, bass, synth module, computer Audio, etc`,`Connect audio from your ZOIA into the outside world.
Connect to your amplifier, a DI box, your audio interface, etc.`,`Connect audio from your ZOIA into the outside world.
Connect to your amplifier, a DI box, your audio interface, etc.`,`Turns a grid button into a button you can push to send a CV signal.
Tap in a tempo, open up a VCA, trigger a sequencer, or anything else.
The grid is your oyster!`,`Turns a grid button into a button you can push to send a CV signal.
Tap in a tempo, open up a VCA, trigger a sequencer, or anything else.
The grid is your oyster!`,"","","","Load or record your favourite sample, chop it up, then play it back at any speed/pitch your heart desires. All samples must be mono or stereo PCM WAV files that are 10 minutes or less in length.","Perform logical operations with CV inputs. Operations include: AND, OR, NOT, NOR, NAND, XOR, XNOR.","An 8 channel CV Mixer and attenuverter.","","This delay effect lets you twist time with reversed, pitch shifted repeats.","Classic vibe sound with some added versatility."],q={computed:{DISPLAY_BLOCK(){return V},MODULES(){return I.map((r,o)=>({m:r,tip:O[o],description:L[o],bes:D(r.blocks).map(l=>[...l,A[T(l,r.id)]])}))}}},F={class:"text-no-wrap g-bolder"},P={class:"text-right"},R={class:"text-right"},_={class:"g-bold"},B={key:0},N={class:"pt-2 pl-8 pb-2",style:{"vertical-align":"top"},colspan:"2"},Y=["rowspan"],E={class:"text-right"},z={class:"g-bold"};function U(r,o,l,G,Z,c){return i(),S(x,{density:"compact"},{default:M(()=>[o[1]||(o[1]=e("thead",null,[e("tr",null,[e("th",null,"Module"),e("th",null,"Category"),e("th",null,"Euro"),e("th",null,"Input"),e("th",null,"Conditional"),e("th",{class:"text-right"}," CPU "),e("th",{class:"text-right"}," Position "),e("th",null,"Display"),e("th",null,"Block"),e("th",null,"Type"),e("th",null,"Param"),e("th",null,"Initial")])],-1)),e("tbody",null,[(i(!0),s(p,null,y(c.MODULES,({m:a,description:g,tip:m,bes:n})=>(i(),s(p,{key:a.id},[e("tr",null,[e("td",F,t(a.name),1),e("td",null,t(a.category),1),e("td",null,t(a.euro),1),e("td",null,t(a.in),1),e("td",null,t(!!a.conditions||void 0),1),e("td",P,t(a.cpu),1),e("td",R,t(n[0][1].position)+". ",1),e("td",null,t(c.DISPLAY_BLOCK[n[0][0]]),1),e("td",_,t(n[0][0]),1),e("td",null,t(n[0][2]),1),e("td",null,t(n[0][1].param),1),e("td",null,t(n[0][1].initial),1)]),n.slice(1).length===0?(i(),s("tr",B,[e("td",N,[u(t(m)+" ",1),b(f,{class:"my-2"}),u(" "+t(g||"[UNDEFINED]"),1)]),o[0]||(o[0]=e("td",{colspan:"10"},null,-1))])):w("",!0),(i(!0),s(p,null,y(n.slice(1),([h,d,C],v)=>(i(),s("tr",{key:h},[v?w("",!0):(i(),s("td",{key:0,class:"pt-2 pl-8 pb-2",style:{"vertical-align":"top"},rowspan:n.length-1,colspan:"6"},[u(t(m)+" ",1),b(f,{class:"my-2"}),u(" "+t(g||"[UNDEFINED]"),1)],8,Y)),e("td",E,t(d.position)+". ",1),e("td",null,t(c.DISPLAY_BLOCK[h]),1),e("td",z,t(h),1),e("td",null,t(C),1),e("td",null,t(d.param),1),e("td",null,t(d.initial),1)]))),128))],64))),128))])]),_:1})}const K=k(q,[["render",U]]);export{K as default};
