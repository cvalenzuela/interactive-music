import React from 'React';
import ReactDOM from 'react-dom';
import UI from './UI';

import {
  showRawVideo,
  trackVideo,
  triggers,
  changeVideo
} from './Sketch';

import './Sketch';
import './styles/reset.css';
import './styles/index.css';

ReactDOM.render(
  <UI 
    showVideo={showRawVideo}
    startTracking={trackVideo}
    triggers={triggers}
    changeVideo={changeVideo}
  />
  , document.getElementById('react-ui'));