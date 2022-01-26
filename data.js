// Formatted by StandardJS

const typeScene = 'scene'
const typeMap = 'map'
const typeAll = 'all'

const keys = {}
const up = 69 // e
const left = 83 // s
const down = 68 // d
const right = 70 // f

const transparent = 'transparent'
const white = 'rgba(255, 255, 255, 1)'
const black = 'rgba(0, 0, 0, 1)'
const grey = 'rgba(127, 127, 127, 1)'

const light1 = 'rgba(223, 223, 223, 1)'
const light2 = 'rgba(191, 191, 191, 1)'
const light3 = 'rgba(159, 159, 159, 1)'
const dark1 = 'rgba(31, 31, 31, 1)'
const dark2 = 'rgba(63, 63, 63, 1)'
const dark3 = 'rgba(95, 95, 95, 1)'

const colorRed = 'rgba(239, 79, 119, 1)'
const colorOrange = 'rgba(239, 123, 107, 1)'
const colorYellow = 'rgba(239, 175, 127, 1)'
const colorGreen = 'rgba(95, 175, 127, 1)'
const colorCyan = 'rgba(0, 143, 143, 1)'
const colorBlue = 'rgba(0, 87, 159, 1)'
const colorIndigo = 'rgba(87, 63, 159, 1)'
const colorViolet = 'rgba(159, 63, 159, 1)'

const tintRed = 'rgba(255, 105, 158, 1)'
const tintOrange = 'rgba(255, 164, 142, 1)'
const tintYellow = 'rgba(255, 233, 169, 1)'
const tintGreen = 'rgba(126, 233, 169, 1)'
const tintCyan = 'rgba(0, 190, 190, 1)'
const tintBlue = 'rgba(0, 116, 211, 1)'
const tintIndigo = 'rgba(116, 84, 211, 1)'
const tintViolet = 'rgba(211, 84, 211, 1)'

const shadeRed = 'rgba(160, 53, 85, 1)'
const shadeOrange = 'rgba(160, 82, 72, 1)'
const shadeYellow = 'rgba(160, 117, 85, 1)'
const shadeGreen = 'rgba(64, 117, 85, 1)'
const shadeCyan = 'rgba(0, 96, 96, 1)'
const shadeBlue = 'rgba(0, 58, 106, 1)'
const shadeIndigo = 'rgba(58, 42, 106, 1)'
const shadeViolet = 'rgba(107, 42, 107, 1)'

const style = grey

// properties

function getData () {
  return {
    config: {
      fov: Math.PI / 3,
      resolution: 1,
      rays: 0,
      step: 0,
      grid: getGrid()
    },
    scene: {
      x: 0,
      y: 0,
      width: 960,
      height: 720
    },
    map: {
      x: 640,
      y: 480,
      unit: 10,
      width: 320,
      height: 240
    },
    player: {
      x: 160,
      y: 30,
      radius: 3,
      gradient: 0,
      direction: Math.PI / 6,
      rotateAmount: Math.PI * 0.0125,
      translateAmount: 1,
      rotateDirection: 0,
      translateDirection: 0
    },
    colors: {
      color: colorCyan,
      tint: tintCyan,
      shade: shadeCyan,
      background: light1,
      content: dark3,
      top: dark2,
      bottom: light2,
      player: dark1,
      ray: white,
      color0: white,
      shade0: black,
      color1: grey,
      tint1: light3,
      shade1: dark3,
      color2: colorRed,
      tint2: tintRed,
      shade2: shadeRed,
      color3: colorOrange,
      tint3: tintOrange,
      shade3: shadeOrange,
      color4: colorYellow,
      tint4: tintYellow,
      shade4: shadeYellow,
      color5: colorGreen,
      tint5: tintGreen,
      shade5: shadeGreen,
      color6: colorCyan,
      tint6: tintCyan,
      shade6: shadeCyan,
      color7: colorBlue,
      tint7: tintBlue,
      shade7: shadeBlue,
      color8: colorIndigo,
      tint8: tintIndigo,
      shade8: shadeIndigo,
      color9: colorViolet,
      tint9: tintViolet,
      shade9: shadeViolet
    }
  }
}

// prettier-ignore

// data

function getGrid() {
  return [
    [9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9],
    [9,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,9],
    [9,0,8,8,8,0,0,8,8,8,0,0,0,0,0,0,0,0,0,0,0,0,2,0,2,2,0,2,2,2,0,9],
    [9,0,8,0,0,0,0,0,0,8,0,0,0,0,0,0,0,0,0,0,0,0,2,0,2,2,0,2,2,2,0,9],
    [9,0,8,0,8,0,0,8,0,8,0,0,0,0,0,0,0,0,0,0,0,0,2,0,2,2,0,2,2,2,0,9],
    [9,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,9],
    [9,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,3,3,0,3,3,3,0,9],
    [9,0,7,0,7,0,0,7,0,7,0,0,0,0,0,0,0,0,0,0,0,0,3,0,3,3,0,3,3,3,0,9],
    [9,0,7,0,0,0,0,0,0,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,9],
    [9,0,7,7,7,0,0,7,7,7,0,0,0,0,0,0,0,0,0,0,0,0,4,0,4,4,0,4,4,4,0,9],
    [9,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,9],
    [9,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,9],
    [9,0,6,6,6,6,6,6,6,6,0,0,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,0,0,0,9],
    [9,0,6,0,0,0,0,0,0,0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,9],
    [9,0,6,0,5,5,5,5,5,5,0,0,5,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,6,0,9],
    [9,0,6,0,5,0,0,0,0,0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,0,9],
    [9,0,6,0,5,0,6,6,6,6,0,0,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,0,9],
    [9,0,6,0,5,0,6,6,6,6,0,0,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,0,9],
    [9,0,6,0,5,0,0,0,0,0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,0,9],
    [9,0,6,0,5,5,5,5,5,5,5,5,5,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,6,0,9],
    [9,0,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,0,9],
    [9,0,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,0,9],
    [9,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,9],
    [9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9],
  ]
}
