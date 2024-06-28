
import p5Types from "p5"
type P5jsContainerRef = HTMLDivElement;
type P5jsSketch = (p: p5Types, parentRef: P5jsContainerRef) => void;

export const sketch: P5jsSketch = ( p5, parentRef ) => {
  let bgImg
  let canvasParent
  let seconds
  let Shader

  p5.preload = () => {
    bgImg = p5.loadImage("/images/commision.jpg")
    Shader = p5.loadShader("/shaders/standard.vert", "/shaders/basic.frag")
  }

  p5.setup = () => {
    p5.pixelDensity(1)
    canvasParent = document.getElementById("canvasParent")
    p5.createCanvas( canvasParent.offsetWidth, canvasParent.offsetHeight, p5.WEBGL ).parent( parentRef )
  }

  p5.draw = () => {
    seconds = p5.millis() / 1000
    Shader.setUniform( "u_time", seconds )
    Shader.setUniform( "u_background", bgImg )
    Shader.setUniform( "u_resolution", [ canvasParent.offsetWidth, canvasParent.offsetHeight ])
    p5.shader( Shader )
    p5.rect( 0, 0, 0 )
  }

  p5.windowResized = () => {
    p5.resizeCanvas( canvasParent.offsetWidth, canvasParent.offsetHeight )
  }

}
