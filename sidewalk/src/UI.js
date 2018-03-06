import React, { Component } from 'React';

import './styles/UI.css';

import brain from './svg/brain.svg';
import hands from './svg/hands.svg';
import legs from './svg/legs.svg';

class UI extends Component{

  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { click } = this.props;
    click();
  }

  render(){
    return (<div>
      
      <Button click={this.handleClick} src={brain}/> 
      <Button click={this.handleClick} src={hands}/>
      <Button click={this.handleClick} src={legs}/>
    </div>)
  }
}

// A button
const Button = ({ click, src }) =>
  <div onClick={click} className="UIButton">
    <img src={src} alt="brain"/>
  </div>

export default UI;