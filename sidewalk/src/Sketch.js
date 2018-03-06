import {
  COLORS, 
  BODY_CONNECTIONS,
  IMAGE_WIDTH,
  IMAGE_HEIGHT,
  VIDEOS
} from './constants';

import SocketManager from './SocketManager';
import Player from './Player';

const player = new Player();

let humans = [];
let capture;
let canvas;
let canvas2Send;
let colors;
let socketManager;

const setup = () => {
  // Canvases
  canvas = createCanvas(windowWidth, windowHeight);
  canvas2Send = createGraphics(IMAGE_WIDTH, IMAGE_HEIGHT);

  // Live Stream
  capture = createCapture(VIDEO);

  // Video Demo
  //capture = createVideo([VIDEOS.s2]);
  //capture.loop();

  // Socket Manager
  socketManager = new SocketManager('http://localhost:33000/query', capture, canvas2Send);

  capture.size(IMAGE_WIDTH, IMAGE_HEIGHT);
  capture.hide();
  strokeWeight(4);
  colors = COLORS.map(e => color(e));
  player.play();
}

const draw = () => {
  // image(capture, 0, 0, IMAGE_WIDTH, IMAGE_HEIGHT);
  // if (humans.length > 0) {
  //   humans.forEach(human => drawHuman(human));
  // }

  noStroke();
  fill(255,0,0);
  ellipse(600, 300, 30, 30);
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
      const x1 = start[1] * windowWidth;
      const y1 = start[2] * windowHeight;
      const x2 = end[1] * windowWidth;
      const y2 = end[2] * windowHeight;

      if(x1 >= 570 && x1 <= 630 && y1 >= 270 && y1 <= 330 || x2 >= 570 && x2 <= 630 && y2 >= 270 && y2 <= 330) {
        player.play();
      }
      line(x1, y1, x2, y2);
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