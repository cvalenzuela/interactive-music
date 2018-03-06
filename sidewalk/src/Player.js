import Tone from 'tone';

class Player {
  constructor() {}

  setNotes(notes) {}

  setBase(index) {
    this.base = files[index];
  }

  play() {

    var player = new Tone.Player("https://tonejs.github.io/examples/audio/505/kick.mp3").toMaster()

    Tone.Buffer.on('load', function() {
      var now = Tone.now()
      player.start(now)
    })


  }

}

export default Player;