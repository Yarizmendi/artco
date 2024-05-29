let timer
let canvas

let font
let timeHeader;
let [width, height] = [700, 500]

let Shader

let texture = 0
let textures = {}
let noiseTexture = null

let uTyme = 0

let texturesArray

let changeEvery = 1

let basicMotion
let advancedMotion
let transitionMotion

function preload(p5) {
  font = p5.loadFont('fonts/cabalFont.ttf')
  Shader = p5.loadShader('shaders/standard.vert', 'shaders/stem-trans.frag')

  textures = {

    "yellow_act": p5.loadImage("images/stem/yellow_actuality.png"),
    "yellow_org": p5.loadImage("images/stem/yellow_org_collab.jpg"),

    "ballerina": p5.loadImage("images/stem/ballerina.png"),
    "reclamation": p5.loadImage("images/stem/Reclamation.png"),

    "yellow_stem": p5.loadImage("images/stem/yellow_org_stem.jpg"),
    "orange_acts": p5.loadImage("images/stem/orange_actuality.png"),

    "yellow_red": p5.loadImage("images/stem/yellow_red_stem.jpg"),
    "blue_red_stem": p5.loadImage("images/stem/blue_red_stem.jpg"),

    "sunset_circles_stem": p5.loadImage("images/stem/sunset_circles_stem.jpg"),
    "pareto": p5.loadImage("images/stem/in-search-of-pareto.png"),

    "patents_stem": p5.loadImage("images/stem/patents_stem.jpg"),
    "person_stem": p5.loadImage("images/stem/person_stem.jpg"),

    "pink_glimpses": p5.loadImage("images/stem/pink_glimpses.png"),
    "predicting": p5.loadImage("images/stem/predicting-the-present.png"),

    "quantum_ballerina": p5.loadImage("images/stem/quantum_ballerina.png"),
    "quantum_computer": p5.loadImage("images/stem/quantum-computer.png"),

    "recon_form": p5.loadImage("images/stem/reconfiguring-formality.jpg"),
    "resistance": p5.loadImage("images/stem/resistance.png"),

    "abstract-toon": p5.loadImage("images/stem/abstract_toon_stem.jpg"),
    "sid": p5.loadImage("images/stem/sid.jpg"),

    "thoughts": p5.loadImage("images/stem/thoughts_wb.png"),
    "perlinNoise": p5.loadImage('images/noise/perlin.png'),

  }
}

function setup(p5) {
  p5.createCanvas(p5.windowWidth, p5.windowHeight, p5.WEBGL)
  p5.textSize(32)
  p5.textFont(font)
  timeHeader = p5.createP("").position(p5.windowWidth - 100, 0)
  timeHeader.style("background-color", "white")


  basicMotion = p5.createCheckbox('basic', true)
  basicMotion.position(0, 10)

  advancedMotion = p5.createCheckbox('advanced', false)
  advancedMotion.position(0, 30)

  texturesArray = Object.values(textures)
  noiseTexture = texturesArray.pop()



}

function draw(p5) {
  p5.shader(Shader)
  timer = p5.round(p5.millis() / 1000)
  timeHeader.html(`${timer} seconds`)

  Shader.setUniform('u_time', p5.millis())
  Shader.setUniform('u_range', 0.25)
  Shader.setUniform('u_threshold', 1.0)
  Shader.setUniform('u_noise', noiseTexture)

  Shader.setUniform('u_basic', true)
  Shader.setUniform('u_advanced', true)

  if (timer - changeEvery == 0 && texture < texturesArray.length - 1) {
    Shader.setUniform('u_tyme', uTyme)
    Shader.setUniform('u_background', texturesArray[texture])
    Shader.setUniform('u_foreground', texturesArray[texture + 1])
    changeEvery += 7
    texture += 1
    uTyme += 7000
  }

  if (texture == texturesArray.length - 1) {
    texturesArray = p5.shuffle(texturesArray)
    texture = 0
  }


  p5.rect(0, 0, 0)

}

// Keep canvas and its content responsive across window resizes
const windowResized = (p5) => {
  p5.resizeCanvas(p5.windowWidth, p5.windowHeight)
}

export { preload, setup, draw, windowResized }
