// Word2Music
// Cristobal Valenzuela
// Interactive Music
// HM3 -> Score realization
// Spring 2018

import Tone from 'tone';

//create a synth and connect it to the master output (your speakers)
// var synth = new Tone.AMSynth().toMaster()

// var loop = new Tone.Loop(function(time){
// 	//play a middle 'C' for the duration of an 8th note
// synth.triggerAttackRelease('B3', '4n', time)
// synth.triggerAttackRelease('A4', '8n', time)
// }, 1)

// //start the loop two seconds after the transport is started
// loop.start(2)

//start the transport to invoke the loop
Tone.Transport.start()

