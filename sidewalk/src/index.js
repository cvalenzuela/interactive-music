import React from 'React';
import ReactDOM from 'react-dom';
import UI from './UI';

import { showRawVideo } from './Sketch';

import './Sketch';
import './styles/reset.css';
import './styles/index.css';

ReactDOM.render(<UI showVideo={showRawVideo}/>, document.getElementById('react-ui'));