
// html
let timer 
let nextChange;
let canvas

// fonts
let font
let timeHeader;
// let [ width, height ] = [ 500, 500 ]

// shaders
let Shader

// textures
let oceanTexture
let treeTexture
let noiseTexture

// booleans
let isTransition

let firstTexture
let secondTexture

let thirdTexture
let fourthTexture

let fifthTexture
let sixthTexture

let seventh
let eighth

let ninth
let tenth

let textures = []

let counter = 0


function preload() {
  // font = loadFont('fonts/cabalFont.ttf')

  firstTexture = loadImage("images/stem/ballerina.png")
  secondTexture = loadImage("images/stem/blue_red_stem.jpg")

  thirdTexture = loadImage("images/stem/glimmer_stem.jpg")
  fourthTexture = loadImage("images/stem/pink_glimpses.png")

  fifthTexture = loadImage("images/stem/predicting-the-present.png")
  sixthTexture = loadImage("images/stem/thoughts_wb.png")

  seventh = loadImage("images/stem/resistance.png")
  eighth = loadImage("images/stem/yellow_org_collab.jpg")

  ninth = loadImage("images/stem/yellow_actuality.png")
  tenth = loadImage("images/stem/quantum-computer.png")


  noiseTexture = loadImage( 'images/noise/perlin.png' )
  Shader = loadShader( 'shaders/stan.vert', 'shaders/main.frag' )

}

function setup() {
  canvas = createCanvas( windowWidth, windowHeight, WEBGL)

  // text options
  // textSize( 24 )
  // textFont( font)
  // timeHeader = createP("").position( 10, 10 )
  // timeHeader.style("background-color", "white")

  textures = [ 
    firstTexture, thirdTexture, 
    secondTexture, fourthTexture,
    fifthTexture, sixthTexture,
    seventh, eighth,
    ninth, tenth
  ]

}

function draw() {
  background( 0 )
  timer = round( millis() / 1000 )

  // timeHeader.html(` time elapsed: ${ timer } seconds ` )

  Shader.setUniform( 'u_time', millis() )
  Shader.setUniform( 'u_noise', noiseTexture )
  Shader.setUniform( 'u_range', 0.2 )
  Shader.setUniform( 'u_threshold', 1.0 )

  if ( timer < 10 ) {
    Shader.setUniform( 'u_background', textures[0] )
    Shader.setUniform( 'u_foreground', textures[1] )
  } 
  else if ( timer < 20 ) {
    Shader.setUniform( 'u_tyme', 10000 )
    Shader.setUniform( 'u_background', textures[1] )
    Shader.setUniform( 'u_foreground', textures[2] )
  }
  else if ( timer < 30 ) {
    Shader.setUniform( 'u_tyme', 20000 )
    Shader.setUniform( 'u_background', textures[2] )
    Shader.setUniform( 'u_foreground', textures[3] )
  }
  else if ( timer < 40 ) {
    Shader.setUniform( 'u_tyme', 30000 )
    Shader.setUniform( 'u_background', textures[3] )
    Shader.setUniform( 'u_foreground', textures[4] )
  }

  else if ( timer < 50 ) {
    Shader.setUniform( 'u_tyme', 40000 )
    Shader.setUniform( 'u_background', textures[4] )
    Shader.setUniform( 'u_foreground', textures[5] )
  }

  else if ( timer < 60 ) {
    Shader.setUniform( 'u_tyme', 50000 )
    Shader.setUniform( 'u_background', textures[5] )
    Shader.setUniform( 'u_foreground', textures[6] )
  }

  else if ( timer < 70 ) {
    Shader.setUniform( 'u_tyme', 60000 )
    Shader.setUniform( 'u_background', textures[6] )
    Shader.setUniform( 'u_foreground', textures[7] )
  }
  else if ( timer < 80 ) {
    Shader.setUniform( 'u_tyme', 70000 )
    Shader.setUniform( 'u_background', textures[7] )
    Shader.setUniform( 'u_foreground', textures[8] )
  }
  else if ( timer < 90 ) {
    Shader.setUniform( 'u_tyme', 80000 )
    Shader.setUniform( 'u_background', textures[8] )
    Shader.setUniform( 'u_foreground', textures[9] )
  }
  else if ( timer < 90 ) {
    Shader.setUniform( 'u_tyme', 80000 )
    Shader.setUniform( 'u_background', textures[9] )
    Shader.setUniform( 'u_foreground', textures[10] )
  }


  shader( Shader )
  rect( 0, 0, 0 )

}

function windowResized() {
  resizeCanvas( windowWidth, windowHeight )
}
