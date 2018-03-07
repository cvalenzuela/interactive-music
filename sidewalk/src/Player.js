import Tone from 'tone';

import * as soundFiles from './sounds';

// Load Sounds type A
export const soundsA = [];
Object.keys(soundFiles.soundsA).forEach(file => {
  soundsA.push(new Tone.Player({
    url: soundFiles.soundsA[file],
    retrigger: false
  }).toMaster())
});

// Load Sounds type B
export const soundsB = [];
Object.keys(soundFiles.soundsB).forEach(file => {
  soundsB.push(new Tone.Player({
    url: soundFiles.soundsB[file],
    retrigger: false
  }).toMaster())
});


// Load the street sound
const street = new Tone.Player({
  url: soundFiles.nyc,
  retrigger: false
}).toMaster()

street.loop = true;
street.volume.value = -15;
street.autostart = true;
