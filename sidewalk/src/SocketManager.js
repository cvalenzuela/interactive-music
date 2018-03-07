import io from 'socket.io-client';
import {
  IMAGE_WIDTH,
  IMAGE_HEIGHT
} from './constants';

import { isTracking } from './Sketch';

class SocketManager {
  constructor(url, capture, canvas2Send) {
    this.socket = io.connect(url);
    this.socket.on('connect', () => {
      console.log('connected');
    });

    // When the server replies with data
    this.socket.on('update_response', (data) => {
      // Get all humans
      const humans = data.results.humans;

      // Draw the video on the screen
      image(capture, 0, 0, windowWidth, windowHeight);
      // Draw the video in the sending canvas
      canvas2Send.image(capture, 0, 0, IMAGE_WIDTH, IMAGE_HEIGHT);

      // If any humans found, draw them
      if (humans.length > 0) {
        humans.forEach(human => drawHuman(human));
      }
      
      // Send another image
      if(isTracking){
        this.sendImg(canvas2Send.elt.toDataURL(), capture, canvas2Send); 
      }

    });

    // When using Runway, use this function
    // socket.on('data', function(data) {
    //   humans = data.results.humans;
    //   console.log(humans.length);
    // });
  }

  // Util to send images to server.
  sendImg(data, capture, canvas2Send) {
    // Send the current frame
    this.socket.emit('update_request', {
      data: data,
      model: 'mobilenet_thin'
    });
   
  }
}

export default SocketManager;