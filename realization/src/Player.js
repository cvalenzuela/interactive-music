import Tone from 'tone';

const AvailableNotes = [
  'C4',
  'D4',
  'E4',
  'F4',
  'G4',
  'A4',
  'B4',
  'C5',
  'D5',
  'E5',
  'F5',
  'G5',
  'A5',
]

class Player {
  constructor(){
    this.notes = ['C4'];
    this.AvailableNotes = AvailableNotes;
    this.synth = new Tone.FMSynth().toMaster();
    this.pattern = new Tone.Pattern((time, note) => {
      this.synth.triggerAttackRelease(note, 0.1, time)
    }, this.notes , 'down');
  }

  setNotes(notes) {
    this.pattern.stop();
    this.notes = notes;
    console.log('new notes are', this.notes);
    this.pattern = new Tone.Pattern((time, note) => {
      this.synth.triggerAttackRelease(note, 0.1, time)
    }, this.notes , 'down')
  }

  start() {
    if(Tone.Transport.state !== 'started'){
      Tone.Transport.start()
    }
    this.pattern.start();
  }

  stop() {
    this.pattern.stop();
  }

}

export default Player;