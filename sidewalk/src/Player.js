import Tone from 'tone';

class Player {
  constructor() {
    this.player = new Tone.Player({
      "url" : "https://tonejs.github.io/examples/audio/505/kick.mp3",
      "retrigger" : false
    }).toMaster()
  }

  getState() {
    return this.player.state;
  }

  setNotes(notes) {}

  setBase(index) {
    this.base = files[index];
  }

  play() {
    this.player.start()
    this.player
  }

}

export default Player;