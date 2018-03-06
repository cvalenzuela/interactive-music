import io from 'socket.io-client';
import {
  IMAGE_WIDTH,
  IMAGE_HEIGHT
} from './constants';


class SocketManager {
  constructor(url, capture, cnvs) {
    this.socket = io.connect(url);
    this.socket.on('connect', () => {
      console.log('connected');
    });

    this.socket.on('update_response', (data) => {
      var humans = data.results.humans;
      console.log(humans.length);
      image(capture, 0, 0, windowWidth, windowHeight);
      cnvs.image(capture, 0, 0, IMAGE_WIDTH, IMAGE_HEIGHT);
      if (humans.length > 0) {
        humans.forEach(human => drawHuman(human));
      }

      this.socket.emit('update_request', {
        data: cnvs.elt.toDataURL(),
        model: 'mobilenet_thin'
      });
      cnvs.image(capture, 0, 0, IMAGE_WIDTH, IMAGE_HEIGHT);
      
 
    });
    // socket.on('data', function(data) {
    //   humans = data.results.humans;
    //   console.log(humans.length);
    // });
  }

  sendImg(data) {
    this.socket.emit('update_request', {
      data: data,
      model: 'mobilenet_thin'
    });
  }
}

export default SocketManager;