
// html
let timer 
let canvas

// fonts
let font
let timeHeader;
let [ width, height ] = [ 500, 500 ]

// shaders
let Shader

// textures
let oceanTexture
let treeTexture
let noiseTexture

// booleans
let isTransition


function preload() {
  font = loadFont('fonts/cabalFont.ttf')

  noiseTexture = loadImage( 'images/noise/perlin.png' )
  oceanTexture = loadImage( 'images/nature/oceans/red_ocean.png' )
  treeTexture = loadImage( 'images/nature/plants/sunset_tree.jpg' )

  Shader = loadShader( 'shaders/stan.vert', 'shaders/main.frag' )

}

function setup() {
  canvas = createCanvas( width, height, WEBGL)

  // text options
  textSize( 24 )
  textFont( font)
  timeHeader = createP("").position( 10, 10 )
  timeHeader.style("background-color", "white")

  isTransition = false

}

function draw() {
  background( 0 )
  timer = round( millis() / 1000 )
  timeHeader.html(` time elapsed: ${ timer } seconds ` )

  // ocean tide function
  Shader.setUniform( 'u_time', millis() )
  Shader.setUniform( 'u_resolution', [ width, height ])
  Shader.setUniform( 'u_foreground', oceanTexture )
  Shader.setUniform( 'u_is_transition', isTransition )

  if ( timer % 4 == 0 ) {
    isTransition = true
    Shader.setUniform( 'u_background', treeTexture )
    Shader.setUniform( 'u_is_transition', isTransition )
    Shader.setUniform( 'u_noise', noiseTexture )
  }
  
  shader( Shader )
  // ocean tide function

  rect( 0, 0, 0 )
}


function oceanTide() {
  Shader.setUniform( 'u_time', millis() )
  Shader.setUniform( 'u_resolution', [ width, height ])
  Shader.setUniform( 'u_foreground', oceanTexture )
  Shader.setUniform( 'u_background', treeTexture )
  Shader.setUniform( 'u_noise', noiseTexture )
  shader( Shader )
}

function windowResized() {
  resizeCanvas( width, height )
}
