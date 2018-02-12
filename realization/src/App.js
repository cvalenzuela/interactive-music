import React, { Component } from 'react';

import Word2Vec from './Word2Vec';
import Input from './Input';

import './styles/App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      w2v: new Word2Vec('wordvecs/wordvecs10000.json', () => { this.stopLoader() }),
      showLoader: true
    }
  }

  stopLoader(){
    this.setState({ showLoader: false })
  }

  render() {
    const { showLoader, w2v } = this.state;
    
    return (
      <div className="App">
        {
          showLoader ? 'Loading...' : <div><Input w2v={w2v} /> <Input w2v={w2v} /> </div>
        }
      </div>
    );
  }
}

export default App;