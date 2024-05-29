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

function preload() {
  font = loadFont('fonts/cabalFont.ttf')
  Shader = loadShader( 'shaders/standard.vert', 'shaders/stem-trans.frag' )

  textures = {
    "ballerina" : loadImage("images/stem/ballerina.png"),
    "blue_red_stem" : loadImage("images/stem/blue_red_stem.jpg"),
    
    "patents_stem" : loadImage("images/stem/patents_stem.jpg"),
    "pink_glimpses" : loadImage("images/stem/pink_glimpses.png"),

    "predicting" : loadImage("images/stem/predicting-the-present.png"),
    "thoughts" : loadImage("images/stem/thoughts_wb.png"),

    "resistance" : loadImage("images/stem/resistance.png"),
    "yellow_org" : loadImage("images/stem/yellow_org_collab.jpg"),

    "yellow_act" : loadImage("images/stem/yellow_actuality.png"),
    "quantum_computer" : loadImage("images/stem/quantum-computer.png"),

    "perlinNoise" : loadImage( 'images/noise/perlin.png' ),

  }

}


function setup() {
  canvas = createCanvas( windowWidth, windowHeight, WEBGL)

  textSize( 24 )
  textFont( font)
  timeHeader = createP("").position( 10, 10 )
  timeHeader.style("background-color", "white")

  texturesArray = Object.values( textures )
  noiseTexture = texturesArray.pop()

}

function draw() {
  background( 0 )
  timer = round( millis() / 1000 ) 
  timeHeader.html( `${ timer } seconds` )

  Shader.setUniform( 'u_time', millis() )
  Shader.setUniform( 'u_range', 0.45 )
  Shader.setUniform( 'u_threshold', 1.0 )
  Shader.setUniform( 'u_noise', noiseTexture )

  if ( timer - changeEvery == 0 && texture < texturesArray.length-1  ) {
    Shader.setUniform( 'u_tyme', uTyme )
    Shader.setUniform( 'u_background', texturesArray[ texture ] )
    Shader.setUniform( 'u_foreground', texturesArray[ texture + 1 ] )
    changeEvery += 10
    texture += 1
    uTyme += 10000
  }

  shader( Shader )
  rect( 0, 0, 0 )

}

function windowResized() {
  resizeCanvas( windowWidth, windowHeight )
}
