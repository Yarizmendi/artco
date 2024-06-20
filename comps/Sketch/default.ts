
async function preload( p5, ref ) {
  "use server"
}

async function setup( p5, ref ) {
  "use server"
  p5.pixelDensity(1)
  let cnv = p5.createCanvas( 
    document.getElementById( "canvasParent" ).offsetWidth,
    document.getElementById( "canvasParent" ).offsetHeight,
    p5.WEBGL
  )
  cnv.parent( ref )
}

async function draw( p5, ref ) {
  "use server"
  p5.rect( 0, 0, 0 )
}

async function windowResized( p5, ref ) {
  "use server"
  p5.resizeCanvas( 
    document.getElementById( "canvasParent" ).offsetWidth,
    document.getElementById( "canvasParent" ).offsetHeight
  )
}

async function sketch( p5 ) {
  "use server"
  p5.preload = ( p5 ) => preload
  p5.setup  = ( p5 ) => setup
  p5.draw  = ( p5 ) => draw
  p5.windowResized = ( p5 ) => windowResized
}

export {
  preload,
  setup,
  draw,
  windowResized,
  sketch
}

export default sketch
