import React, { Component } from 'react';

import { map } from './utils';
import Player, { files } from './Player';
import { guid } from './utils';

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
      baseIndex: 0,
      notValid: false,
      player: new Player(),
      speed: 2
    }
  }

  handleInputChange = (event) => {
    this.setState({ currentValue: event.target.value })
  }

  handleAddWord = () => {
    const { words, currentValue, leadWord, player } = this.state;
    const { w2v } = this.props;
    
    const isValid = w2v.model.hasOwnProperty(currentValue);
    if(!isValid){
      this.setState({ notValid: true  });
    } else if (isValid && player.notes.length === 0) {
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

  addFirstNote() {
    const { player } = this.state;
    player.start()
  }

  handleRemoveWord = (index) => {
    const { words } = this.state;
    words.splice(index, 1);
    this.removeNote(index);
    this.setState({
      words
    });
  }

  removeNote(index){
    const { player } = this.state;
    const notes = player.notes;
    notes.splice(index, 1);
    player.setNotes(notes);
  }

  getDistanceBetweenLeadAndWord(input) {
    const { minValue, maxValue, leadWord, words } = this.state;
    const { w2v } = this.props;

    const subtract = w2v.subtract([leadWord, input], 2);
    const distance = map(subtract[0].distance, minValue, maxValue, 0, 1);
    words.push(input);
    this.setState({
      currentValue: '',
      notValid: false,
      words
    });
    this.addNote(distance);
  }

  removeInstance = () => {
    const { id, remove } = this.props;
    const { player } = this.state;
    player.stop()
    remove(id);
  }

  addNote(distance) {
    const { player } = this.state;
    const notes = player.notes;

    let note = parseInt(map(distance, 0, 1, player.availableNotes.length, 0));
    if (note >= player.availableNotes.length){
      note = player.availableNotes.length - 1;
    }
    notes.push(player.availableNotes[note]);
    player.setNotes(notes);
  }

  handleEnter = (e) => {
    if(e.key === 'Enter'){
      this.handleAddWord();
    }
  }

  handleChangeSpeed = (event) => {
    const { speed, player } = this.state;
    const newSpeed = event.target.value;
    this.setState({ speed:  newSpeed });
    player.setSpeed(newSpeed);
  }

  handleChangeBase = (baseIndex) => {
    const { player } = this.state;
    player.playNoteOnce(baseIndex);
    player.setBase(baseIndex);
    this.setState({
      baseIndex
    });
  }

  render() {
    const { currentValue, words, notValid, speed, baseIndex } = this.state;

    return (
      <div className="Input">
        <ul>
        {
          files.map((file, i) => <li key={guid()}><button onClick={() => this.handleChangeBase(i)} className={baseIndex === i ?"BaseBtnSelected" : "BaseBtn"}>{i}</button></li> )
        }
        </ul>
        <input type="range" value={speed} onChange={this.handleChangeSpeed} min="1" max="16" className="Slider"/>

        <input type="text" onChange={this.handleInputChange} onKeyPress={this.handleEnter} value={currentValue} />
  
        <button onClick={this.handleAddWord} className="AddWord">Add Word</button>
        <button onClick={this.removeInstance} className="RemoveBar"></button>
        
        <p className="MsgError">{ notValid ? 'Not a valid word' : null }</p>

        <div className="Bar">
          { words.map((word, index) => {
            return(
              <div key={guid()}>
                <p className={index === 0 ? 'BaseWord' : null}> {word} </p>
                <button className="RemoveWord" onClick={() => this.handleRemoveWord(index)}></button>
              </div>
            )
            }) 
          }
        </div>

      </div>
    );
  }
}

export default Input;