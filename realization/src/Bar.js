import React, { Component } from 'react';
import { guid } from './utils';

class Bar extends Component {
  render() {  
    const { words } = this.props;

    return (
      <div className="Bar">
        {words.map(word => <p key={guid()}>{word}</p>)}
      </div>
    );
  }
}

export default Bar;