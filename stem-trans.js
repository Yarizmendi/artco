let timer
let canvas

let font
let timeHeader;
let [width, height] = [700, 500]

let Shader

let texture = 0
let textures = {}
let noiseTexture = null

let texturesArray

let changeEvery = 1

let transitionMotion

let [ basicX, basicY ] = []
let [ advX, advY ] = []

function preload() {
  font = loadFont('fonts/cabalFont.ttf')
  Shader = loadShader('shaders/standard.vert', 'shaders/stem-trans.frag')

  textures = {

    "yellow_act": loadImage("images/stem/yellow_actuality.png"),
    "yellow_org": loadImage("images/stem/yellow_org_collab.jpg"),

    "ballerina": loadImage("images/stem/ballerina.png"),
    "reclamation": loadImage("images/stem/Reclamation.png"),

    "yellow_stem": loadImage("images/stem/yellow_org_stem.jpg"),
    "orange_acts": loadImage("images/stem/orange_actuality.png"),

    "yellow_red": loadImage("images/stem/yellow_red_stem.jpg"),
    "blue_red_stem": loadImage("images/stem/blue_red_stem.jpg"),

    "sunset_circles_stem": loadImage("images/stem/sunset_circles_stem.jpg"),
    "pareto": loadImage("images/stem/in-search-of-pareto.png"),

    "patents_stem": loadImage("images/stem/patents_stem.jpg"),
    "person_stem": loadImage("images/stem/person_stem.jpg"),

    "pink_glimpses": loadImage("images/stem/pink_glimpses.png"),
    "predicting": loadImage("images/stem/predicting-the-present.png"),

    "quantum_ballerina": loadImage("images/stem/quantum_ballerina.png"),
    "quantum_computer": loadImage("images/stem/quantum-computer.png"),

    "recon_form": loadImage("images/stem/reconfiguring-formality.jpg"),
    "resistance": loadImage("images/stem/resistance.png"),

    "abstract-toon": loadImage("images/stem/abstract_toon_stem.jpg"),
    "sid": loadImage("images/stem/sid.jpg"),

    "thoughts": loadImage("images/stem/thoughts_wb.png"),
    "perlinNoise": loadImage('images/noise/perlin.png'),

  }

}

function setup() {

  canvas = createCanvas( windowWidth * 3/4 , windowHeight, WEBGL )
  canvas.position( windowWidth * 1/4, 0 )
  canvas.style( "border", "solid black 5px" )

  textSize( 32 )
  textFont( font)

  timeHeader = createP("").position( 10, 0 )
  transitionMotion = createCheckbox( 'transition', true ).position( 10, 60 )

  basicX = createCheckbox( 'basic x', false ).position( 10, 80 )
  basicY = createCheckbox( 'basic y', false ).position( 10, 100 )

  advX = createCheckbox( 'adv x', false ).position( 10, 120 )
  advY = createCheckbox( 'adv y', false ).position( 10, 140 )

  texturesArray = Object.values( textures ) 
  noiseTexture = texturesArray.pop()

}

function draw() {
  background( 0 )
  timer = round(millis() / 1000 )
  timeHeader.html(`${timer} seconds` )

  Shader.setUniform('u_time', millis() )
  Shader.setUniform('u_range', 0.25 )
  Shader.setUniform('u_threshold', 1.0 )
  Shader.setUniform('u_noise', noiseTexture )

  Shader.setUniform( 'u_basicX', basicX.checked() )
  Shader.setUniform( 'u_basicY', basicY.checked() )

  Shader.setUniform( 'u_advX', advX.checked() )
  Shader.setUniform( 'u_advY', advY.checked() )

  if ( transitionMotion.checked() ) {
    if ( timer - changeEvery == 0 && texture < texturesArray.length ) {
      Shader.setUniform('u_tyme', changeEvery * 1000 )
      Shader.setUniform('u_background', texturesArray[ texture ])
      Shader.setUniform('u_foreground', texturesArray[texture + 1])
      changeEvery += 9
      texture += 1
    }
  } else { 
    changeEvery = timer
    Shader.setUniform('u_foreground', texturesArray[ texture ])
  }

  if (texture == texturesArray.length - 1) {
    texturesArray = shuffle(texturesArray)
    texture = 0
  }

  shader(Shader)
  rect(0, 0, 0)

}

function windowResized() {
  resizeCanvas(windowWidth * 3/4, windowHeight )
}

