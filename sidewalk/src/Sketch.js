import {
  COLORS, 
  BODY_CONNECTIONS,
  IMAGE_WIDTH,
  IMAGE_HEIGHT,
  VIDEOS
} from './constants';

import SocketManager from './SocketManager';

let humans = [];
let capture;
let canvas;
let canvas2Send;
let colors;
let socketManager;

const setup = () => {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas2Send = createGraphics(IMAGE_WIDTH, IMAGE_HEIGHT);
  // Live Stream
  // capture = createCapture(VIDEO);

  // Video Demo
  capture = createVideo([VIDEOS.s2]);
  capture.loop();
  socketManager = new SocketManager('http://localhost:33000/query', capture, canvas2Send);

  capture.size(IMAGE_WIDTH, IMAGE_HEIGHT);
  capture.hide();
  strokeWeight(4);
  colors = COLORS.map(e => color(e));
}

const draw = () => {
  // image(capture, 0, 0, IMAGE_WIDTH, IMAGE_HEIGHT);
  // if (humans.length > 0) {
  //   humans.forEach(human => drawHuman(human));
  // }
}

const drawHuman = (human) => {
  BODY_CONNECTIONS.forEach((connection, i) => {
    let start = null;
    let end = null;
    human.forEach(bodyPart => {
      const name = bodyPart[0];
      if (name === connection[0]) {
        start = bodyPart;
      } else if (name === connection[1]) {
        end = bodyPart;
      }
    });
    stroke(255, 255, 255);
    if (start && end) {
      line(start[1] * windowWidth, start[2] * windowHeight, end[1] * windowWidth, end[2] * windowHeight);
    }
  });
}

const mousePressed = () => {

}

const start = () => {
  console.log('sending new image', Date.now());
  socketManager.sendImg(canvas2Send.elt.toDataURL());
}

window.setup = setup;
window.draw = draw;
window.capture = capture;
window.drawHuman = drawHuman;
window.mousePressed = mousePressed;
window.start = start;