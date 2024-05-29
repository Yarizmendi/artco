let timer 
let canvas

let font
let timeHeader;
let [ width, height ] = [ 700, 500 ]

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

function preload() {
  font = loadFont('fonts/cabalFont.ttf')
  Shader = loadShader( 'shaders/standard.vert', 'shaders/stem-trans.frag' )

  textures = {

    "yellow_act" : loadImage("images/stem/yellow_actuality.png"),
    "yellow_org" : loadImage("images/stem/yellow_org_collab.jpg"),

    "ballerina" : loadImage("images/stem/ballerina.png"),
    "reclamation" : loadImage("images/stem/Reclamation.png"),

    "yellow_stem" : loadImage("images/stem/yellow_org_stem.jpg"),
    "orange_acts" : loadImage("images/stem/orange_actuality.png"),
 
    "yellow_red" : loadImage("images/stem/yellow_red_stem.jpg"),
    "blue_red_stem" : loadImage("images/stem/blue_red_stem.jpg"),

    "sunset_circles_stem": loadImage("images/stem/sunset_circles_stem.jpg"),
    "pareto" : loadImage("images/stem/in-search-of-pareto.png"),

    "patents_stem" : loadImage("images/stem/patents_stem.jpg"),
    "person_stem" : loadImage("images/stem/person_stem.jpg"),

    "pink_glimpses" : loadImage("images/stem/pink_glimpses.png"),
    "predicting" : loadImage("images/stem/predicting-the-present.png"),

    "quantum_ballerina" : loadImage("images/stem/quantum_ballerina.png"),
    "quantum_computer" : loadImage("images/stem/quantum-computer.png"),
 
    "recon_form" : loadImage("images/stem/reconfiguring-formality.jpg"),
    "resistance" : loadImage("images/stem/resistance.png"),

    "abstract-toon": loadImage("images/stem/abstract_toon_stem.jpg"),
    "sid" : loadImage("images/stem/sid.jpg"),

    "thoughts" : loadImage("images/stem/thoughts_wb.png"),
    "perlinNoise" : loadImage( 'images/noise/perlin.png' ),

  }

}

function setup() {
  canvas = createCanvas( windowWidth, windowHeight, WEBGL)

  textSize( 32 )
  textFont( font)
  timeHeader = createP("").position( windowWidth - 100, 0 )
  timeHeader.style("background-color", "white")

  basicMotion = createCheckbox( 'basic', true )
  basicMotion.position(0, 10)

  advancedMotion = createCheckbox( 'advanced', false )
  advancedMotion.position(0, 30)

  texturesArray = Object.values( textures )
  noiseTexture = texturesArray.pop()

}

function draw() {
  background( 0 )
  timer = round( millis() / 1000 ) 
  timeHeader.html( `${ timer } seconds` )

  Shader.setUniform( 'u_time', millis() )
  Shader.setUniform( 'u_range', 0.25 )
  Shader.setUniform( 'u_threshold', 1.0 )
  Shader.setUniform( 'u_noise', noiseTexture )

  Shader.setUniform( 'u_basic', basicMotion.checked() )
  Shader.setUniform( 'u_advanced', advancedMotion.checked() )

  if ( timer - changeEvery == 0 && texture < texturesArray.length-1  ) {
    Shader.setUniform( 'u_tyme', uTyme )
    Shader.setUniform( 'u_background', texturesArray[ texture ] )
    Shader.setUniform( 'u_foreground', texturesArray[ texture + 1 ] )
    changeEvery += 7
    texture += 1
    uTyme += 7000
  }

  if (texture == texturesArray.length-1) {
    texturesArray = shuffle( texturesArray )
    texture = 0
  }

  shader( Shader )
  rect( 0, 0, 0 )

}

function windowResized() {
  resizeCanvas( windowWidth, windowHeight )
}

