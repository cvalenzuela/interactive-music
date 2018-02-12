import React, { Component } from 'react';

import Bar from './Bar';
import { map } from './utils';
import Player from './Player';

class Input extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentValue: '',
      leadWord: '',
      minValue: '',
      maxValue: '',
      furthest: '',
      nearest: '',
      words: [],
      notValid: false,
      player: new Player()
    }
  }

  handleInputChange = (event) => {
    this.setState({ currentValue: event.target.value })
  }

  handleAddWord = () => {
    const { words, currentValue, leadWord } = this.state;
    const { w2v } = this.props;
    
    const isValid = w2v.model.hasOwnProperty(currentValue);

    if(!isValid){
      this.setState({ notValid: true  });
    } else if (isValid && leadWord === '') {
      const furthest = w2v.subtract([currentValue, currentValue], 2);
      const nearest = w2v.subtract([currentValue, furthest[0].vector], 2);
      const minValue = nearest[0].distance;
      const maxValue = furthest[0].distance;
      words.push(currentValue);
      this.setState({ 
        words,
        notValid: false,
        currentValue: '',
        furthest,
        nearest,
        minValue,
        maxValue,
        leadWord: currentValue
       });
       this.addFirstNote();
    } else {
      this.getDistanceBetweenLeadAndWord(currentValue)
    }
  }

  getDistanceBetweenLeadAndWord(input) {
    const { minValue, maxValue, leadWord, words } = this.state;
    const { w2v } = this.props;

    const subtract = w2v.subtract([leadWord, input], 2);
    const distance = map(subtract[0].distance, minValue, maxValue, 0, 1);
    words.push(input);
    this.setState({
      currentValue: '',
      notValid: false
    })
    this.addNote(distance);
  }

  addFirstNote(){
    const { player } = this.state;
    player.start()
  }

  addNote(distance) {
    const { player } = this.state;
    const notes = player.notes;

    let note = parseInt(map(distance, 0, 1, player.AvailableNotes.length, 0));
    if (note >= player.AvailableNotes.length){
      note = player.AvailableNotes.length - 1;
    }
    notes.push(player.AvailableNotes[note]);
    player.setNotes(notes);
    player.start();
    console.log('note', note, player.AvailableNotes[note], notes)
  }

  render() {
    const { currentValue, words, notValid } = this.state;

    return (
      <div className="Input">
        <input type="text" onChange={this.handleInputChange} value={currentValue} />
        <button onClick={this.handleAddWord}>Add Word</button>
        <p>{ notValid ? 'Not a valid word' : null }</p>
        <Bar words={words} className="Bar"/>
      </div>
    );
  }
}

export default Input;