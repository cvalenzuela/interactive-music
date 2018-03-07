import React, { Component } from 'React';

import './styles/UI.css';

import brain from './svg/brain.svg';
import hands from './svg/hands.svg';
import legs from './svg/legs.svg';
import skeleton from './svg/skeleton.svg';
import start from './svg/start.svg';
import stop from './svg/stop.svg';
import video from './svg/video.svg';
import change from './svg/change.svg';
import reset from './svg/reset.svg';

import { changeSound } from './Sketch';

class UI extends Component{

  constructor(props){
    super(props);
    this.state = {
      playIcon: start
    }

    this.handleShowVideo = this.handleShowVideo.bind(this);
    this.handleStartTracking = this.handleStartTracking.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleChangeVideo = this.handleChangeVideo.bind(this);
  }

  handleChangeVideo() {
    const { changeVideo } = this.props;
    changeVideo();
  }

  handleStartTracking() {
    const { startTracking } = this.props;
    startTracking();
  }

  handleShowVideo() {
    const { showVideo } = this.props;
    const { playIcon } = this.state;
    showVideo();

    if (playIcon === start ){
      this.setState({ playIcon: stop })
    } else {
      this.setState({ playIcon: start })
    }
  }

  handleReset() {
    const { triggers } = this.props;
    triggers.removeAll();
  }

  render(){
    const { playIcon } = this.state;


    return (
      <div className="UI">
        <div className="ControlBtns">
          <Button click={this.handleShowVideo} src={playIcon} className="UIButton"/> 
          <Button click={this.handleClick} src={video} className="UIButton"/> 
          <Button click={this.handleStartTracking} src={skeleton} className="UIButton"/> 
          <Button click={this.handleChangeVideo} src={change} className="UIButton"/>
          <Button click={this.handleReset} src={reset} className="UIButton"/>
        </div>

        <div className="SoundsBtns">
          <Button click={() => changeSound('soundsA')} src={brain} className="SoundButton" color={'#25fff5'}/> 
          <Button click={() => changeSound('soundsB')} src={hands} className="SoundButton" color={'#25e1ff'}/>
          <Button click={this.handleClick} src={legs} className="SoundButton" color={'#25ffd7'}/>
        </div>
      </div>
  )
  }
}

// Button
const Button = ({ click, src, className, color }) => 
  <div onClick={click} className={className} style={{ background: color }}>
    <img src={src} alt={className} />
  </div>

export default UI;