import React, { Component } from 'react';

import Word2Vec from './Word2Vec';
import Input from './Input';
import { guid } from './utils';

import loading from './imgs/loading.gif';

import './styles/App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      w2v: new Word2Vec('wordvecs/wordvecs10000.json', () => { this.setState({ showLoader: false }) }),
      showLoader: true,
      inputs: []
    }
  }

  handleAddInput = () => {
    const { inputs, w2v } = this.state;
    inputs.push(guid());
    this.setState({
      inputs
    });
  }

  handleRemoveInput = (uid) => {
    const { inputs } = this.state;
    console.log('gotg here', uid)
    const newInputs = inputs.filter(i => {
      if(uid !== i){
        return i
      }
    });
    this.setState({
      inputs: newInputs
    })
  }

  render() {
    const { showLoader, inputs, w2v } = this.state;

    return (
      <div className="App">
        {
          showLoader 
          ? 
          <div className="Loading">
            <img src={loading} />
            <p>Loading...</p>
          </div>
          : 
          <div className="Main">
            <h2>w<span>2</span>m</h2>
            <button onClick={this.handleAddInput} className="AddBarBtn">Add Bar</button>
            {
              inputs.map(key => <Input w2v={w2v} key={key} id={key} remove={this.handleRemoveInput}/>)
            }
          </div>
        }
      </div>
    );
  }
}

export default App;