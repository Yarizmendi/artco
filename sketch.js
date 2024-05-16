
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
let oceanTexture

let treeTexture
let TreeTransitionShader
let treeTransitionTexture
let treeTransitionNoiseTexture

let transitOpacity

function preload() {
  font = loadFont('fonts/cabalFont.ttf')

  oceanTexture = loadImage( 'images/nature/oceans/red_ocean.png' )
  OceansShader = loadShader( 'shaders/stan.vert', 'shaders/oceans.frag' )

  // treeTexture = loadImage( 'tree.jpg' )
  // treeTransitionTexture = loadImage( 'transition_one.png' )
  // treeTransitionNoiseTexture = loadImage( 'perlin.png' )
  // TreeTransitionShader = loadShader( 'oceans.vert', 'noiseMix.frag' )
}

function setup() {
  canvas = createCanvas( width, height, WEBGL)

  // text options
  // textSize( 24 )
  // textFont( font)
  // timeHeader = createP("").position( 10, 10 )
  // timeHeader.style("background-color", "white")

  // slider options
  // slider = createSlider( 15.0, 100.0, 1.0 )
  // slider.position(10, 10)
  // slider.size(80)
  
}

function draw() {
  background( 0 )
  // timer = round( millis() / 1000 )
  // timeHeader.html(` time elapsed: ${ timer } seconds ` )


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
  transitOpacity += 0.1;
  OceansShader.setUniform( 'u_time', millis() )
  OceansShader.setUniform( 'u_resolution', [ width, height ])
  OceansShader.setUniform( 'u_foreground', oceanTexture )
  OceansShader.setUniform( 'u_noise_tex', treeTransitionNoiseTexture )
  // OceansShader.setUniform( 'u_tree_tex', treeTexture )
  OceansShader.setUniform( 'u_waves_cnt', 15 )
  shader( OceansShader )
}

function windowResized() {
  resizeCanvas( width, height );
}
