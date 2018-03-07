import {
  COLORS,
  BODY_CONNECTIONS,
  IMAGE_WIDTH,
  IMAGE_HEIGHT,
  VIDEOS,
  C_SIZE,
  C_RADIUS,
  FOOTER_HEIGHT
} from './constants';

import SocketManager from './SocketManager';
import Triggers from './Triggers';
import { soundsA, soundsB } from './Player';

import video01 from './video/street01.mp4'
import video02 from './video/nyc.mp4'
import video03 from './video/street03.mp4'

const avaiVideos = [video01, video02, video03];

// Current color
let currentColor = 'rgba(37,255,245, 0.75)';
// Current selected sound
let currentSound = 'soundsA';

// Circle Trigger Manager
export const triggers = new Triggers();

let humans = [];
let capture;
let canvas;
let canvas2Send;
let colors;
let socketManager;
let triggerTracking = false;

const setup = () => {
  // Canvases
  canvas = createCanvas(windowWidth, windowHeight);
  canvas2Send = createGraphics(IMAGE_WIDTH, IMAGE_HEIGHT);

  // Live Stream
  // capture = createCapture(VIDEO);

  // Video Demo
  capture = createVideo([video02]);

  // Socket Manager
  socketManager = new SocketManager('http://localhost:33000/query', capture, canvas2Send);

  capture.size(IMAGE_WIDTH, IMAGE_HEIGHT);
  capture.hide();
  strokeWeight(4);
  colors = COLORS.map(e => color(e));
  frameRate(10);
}

const draw = () => {
  //image(capture, 0, 0, windowWidth, windowHeight);
  if (playVideo && !isTracking) {
    image(capture, 0, 0, windowWidth, windowHeight);
  }

  noStroke();
  fill(currentColor);

  // Draw all triggers
  triggers.getAll().forEach(trigger => ellipse(trigger.x, trigger.y, C_SIZE))

  // Debug sounds with mouse
  checkAndTriggerSound(mouseX, mouseY, mouseX, mouseY);
}

// Draw a human
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
    stroke('rgba(87,255,245, 0.75)');
    if (start && end) {
      const x1 = start[1] * windowWidth;
      const y1 = start[2] * windowHeight;
      const x2 = end[1] * windowWidth;
      const y2 = end[2] * windowHeight;

      checkAndTriggerSound(x1, y1, x2, y2);
      line(x1, y1, x2, y2);
    }
  });
}

// Add a new instrument
const mousePressed = () => {
  // Check if it's on top of an existing trigger
  const existing = checkIfOverTrigger(mouseX, mouseY);
  if (existing.id) {
    // Remove the existing one
    triggers.remove(existing);
  } else if(mouseY < windowHeight - FOOTER_HEIGHT) {
    // Add a new trigger
    triggers.add({
      id: Date.now(),
      x: mouseX,
      y: mouseY,
      x1: mouseX - C_RADIUS,
      x2: mouseX + C_RADIUS,
      y1: mouseY - C_RADIUS,
      y2: mouseY + C_RADIUS,
      soundType: currentSound
    })
  }
}

// Check if human is over a trigger
const checkAndTriggerSound = (x1, y1, x2, y2) => {
  triggers.getAll().forEach(t => {
    if (x1 >= t.x1 && x1 <= t.x2 && y1 >= t.y1 && y1 <= t.y2 || x2 >= t.x1 && x2 <= t.x2 && y2 >= t.y1 && y2 <= t.y2) {
      if(t.soundType === 'soundsA'){
        const i = Math.floor(map(y1, 0, windowHeight, soundsA.length - 1, 0));
        if (soundsA[i].state === 'stopped') {
          soundsA[i].start();
        }
      } else if(t.soundType === 'soundsB') {
        const i = Math.floor(map(y1, 0, windowHeight, soundsB.length - 1, 0));
        if (soundsB[i].state === 'stopped') {
          soundsB[i].start();
        }
      }

    }
  })
}

// Check if click is over a trigger
const checkIfOverTrigger = (x, y) => {
  let trigger = {};
  triggers.getAll().forEach(t => {
    if (x >= t.x1 && x <= t.x2 && y >= t.y1 && y <= t.y2) {
      trigger = t;
    }
  });
  return trigger;
}

let playVideo = false;
// Show the raw video stream
export const showRawVideo = () => {
  playVideo = !playVideo;
  if(playVideo){
    capture.loop()
  } else {
    capture.pause();
  }
}

export let isTracking = false;
// Start Tracking the current video
export const trackVideo = () => {
  isTracking = !isTracking;
  if(isTracking){
    start()
  }  
}

// Log start
const start = () => {
  socketManager.sendImg(canvas2Send.elt.toDataURL(), capture, canvas2Send);
}

// Change the video src
export const changeVideo = () => {
  const video = avaiVideos[Math.floor(random(0, avaiVideos.length))];
  capture.elt.src = video;
}

// Change the sound and color
export const changeSound = (type) => {
  currentSound = type;
}

window.setup = setup;
window.draw = draw;
window.capture = capture;
window.drawHuman = drawHuman;
window.mousePressed = mousePressed;
window.start = start;