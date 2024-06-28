
function sketch( p5, parentRef, path ) {
  let Shader 
  let texture
  let seconds
  let canvasParent 

  p5.preload = () => {
    Shader = p5.loadShader("/shaders/standard.vert", "/shaders/basic.frag")
    texture = p5.loadImage(`/images/${ path }`)
  }

  p5.setup = () => {
    p5.pixelDensity(1)
    canvasParent = document.getElementById("canvasParent")
    p5.createCanvas( canvasParent.offsetWidth, canvasParent.offsetHeight, p5.WEBGL ).parent( parentRef )
  }

  p5.draw = () => {
    seconds = p5.millis() / 1000
    Shader.setUniform( "u_time", seconds )
    Shader.setUniform( "u_background", texture )
    Shader.setUniform( "u_resolution", [ canvasParent.offsetWidth, canvasParent.offsetHeight ])
    p5.shader( Shader )
    p5.rect( 0 )

  }

  p5.windowResized = () => {
    p5.resizeCanvas( canvasParent.offsetWidth, canvasParent.offsetHeight )
  }

}

export default sketch
