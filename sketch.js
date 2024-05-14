
// html
let slider
let timer 
let canvas

// fonts
let font
let timeHeader;
let [ width, height ] = [ 500, 500 ]

// shaders
let OceansShader
let TreeTransitionShader

// textures
let oceanTexture
let treeTexture
let noiseTexture


function preload() {
  font = loadFont('fonts/cabalFont.ttf')

  noiseTexture = loadImage( 'images/noise/perlin.png' )
  oceanTexture = loadImage( 'images/nature/oceans/red_ocean.png' )
  treeTexture = loadImage( 'images/nature/plants/sunset_tree.jpg' )

  OceansShader = loadShader( 'shaders/oceans.vert', 'shaders/oceans.frag' )

}

function setup() {
  canvas = createCanvas( width, height, WEBGL)

  // text options
  textSize( 24 )
  textFont( font)
  timeHeader = createP("").position( 10, 10 )
  timeHeader.style("background-color", "white")

  // slider options
  slider = createSlider( 15.0, 100.0, 1.0 )
  slider.position(10, 10)
  slider.size(80)
  
}

function draw() {
  background( 0 )
  timer = round( millis() / 1000 )
  timeHeader.html(` time elapsed: ${ timer } seconds ` )


  // if ( timer < 45 ) {
    oceanTide()
  // } 


  rect( 0, 0, 0 )
}

function keyPressed() {
  if (key === 's') {
    saveCanvas( canvas );
  }
}

function oceanTide() {
  OceansShader.setUniform( 'u_time', millis() )
  OceansShader.setUniform( 'u_resolution', [ width, height ])
  OceansShader.setUniform( 'u_foreground', oceanTexture )
  OceansShader.setUniform( 'u_noise_tex', noiseTexture )
  OceansShader.setUniform( 'u_tree_tex', treeTexture )
  OceansShader.setUniform( 'u_waves_cnt', 15 )
  shader( OceansShader )
}

function windowResized() {
  resizeCanvas( width, height )
}
