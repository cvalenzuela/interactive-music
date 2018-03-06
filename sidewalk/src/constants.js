const IMAGE_WIDTH = 432;
const IMAGE_HEIGHT = 368;

const VIDEOS = {
  s1: 'https://dl.dropbox.com/s/opd7cqrkfpjuog1/street01.mp4?dl=0',
  s2: 'https://dl.dropbox.com/s/5iqookf3lj4i1zp/street02.mp4?dl=0'
}

const BODY_CONNECTIONS = [
  ['Nose', 'Left_Eye'],
  ['Left_Eye', 'Left_Ear'],
  ['Nose', 'Right_Eye'],
  ['Right_Eye', 'Right_Ear'],
  ['Nose', 'Neck'],
  ['Neck', 'Right_Shoulder'],
  ['Right_Shoulder', 'Right_Elbow'],
  ['Right_Elbow', 'Right_Wrist'],
  ['Neck', 'Left_Shoulder'],
  ['Left_Shoulder', 'Left_Elbow'],
  ['Left_Elbow', 'Left_Wrist'],
  ['Neck', 'Right_Hip'],
  ['Right_Hip', 'Right_Knee'],
  ['Right_Knee', 'Right_Ankle'],
  ['Neck', 'Left_Hip'],
  ['Left_Hip', 'Left_Knee'],
  ['Left_Knee', 'Left_Ankle'],
]

const COLORS = [
  '#00ff00',
  '#ffff00',
  '#ff0000',
  '#00ffff',
  '#ffffff',
  '#f4f',
  '#00ff',
  '#ffaf00',
  '#aff',
  '#aaf',
  '#33a',
  '#55f',
  '#771',
  '#15f',
  '#ff0000',
  '#00ff00',
  '#ffff00',
  '#ff0000'
]

export {
  BODY_CONNECTIONS,
  COLORS,
  IMAGE_WIDTH,
  IMAGE_HEIGHT,
  VIDEOS
}