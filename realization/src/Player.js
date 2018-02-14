import Tone from 'tone';

const baseUrl = './mp3/';
const availableNotes = [
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
];

const files = [
  '01.mp3',
  '02.mp3',
  '03.mp3',
  '04.mp3',
  '05.mp3',
  '06.mp3',
  '07.mp3',
  '08.mp3',
  '09.mp3',
  '10.mp3',
  '11.mp3',
  '12.mp3',
  '13.mp3',
]


class Player {
  constructor(){
    this.availableNotes = availableNotes;
    this.notes = [];
    this.sampler = null;
    this.loop = null;
    this.speed = '2n'
    this.base = files[0];
  }

  setNotes(notes) {
    Tone.Transport.clear(this.loop);
    this.notes = notes;
    if(this.notes.length > 0){
      this.restartLoop();
    } else {
      this.sampler = null;
    }
  }

  setBase(index) {
    this.base = files[index];
  }

  start() {
    if(Tone.Transport.state !== 'started'){
      Tone.Transport.start()
    }
    if(!this.sampler) {
      console.log('should be here again')
      this.sampler = new Tone.Sampler({
        'C4' : this.base,
        }, {
        'release' : 1,
        baseUrl
      }).toMaster();
      this.notes = ['C4'];
    } else {
      this.notes = ['C4'];
      this.restartLoop(); 
    }
    Tone.Buffer.on('load', () => {
      this.restartLoop();
    })
  }

  stop() {
    Tone.Transport.clear(this.loop);
  }

  playNoteOnce(index) {
    const player = new Tone.Player(`${baseUrl}/${files[index]}`).toMaster();
    player.autostart = true;
  }

  setSpeed(speed){
    this.speed = `${speed}n`;
    Tone.Transport.clear(this.loop);
    this.restartLoop();
  }

  restartLoop() {
    Tone.Transport.clear(this.loop);
    
    this.loop = Tone.Transport.scheduleRepeat((time) => {
      this.notes.forEach((note, i) => {
        this.sampler.triggerAttackRelease(note);
      });
    }, this.speed);
  }

}

export default Player;

export {
  files
}