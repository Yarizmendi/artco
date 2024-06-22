

export default function sketch( p5 ) {

  p5.preload = () => {}

  p5.setup = () =>  {
    p5.pixelDensity(1)
    p5.createCanvas( 
      document.getElementById( "canvasParent" ).offsetWidth,
      document.getElementById( "canvasParent" ).offsetHeight,
      p5.WEBGL
    )
  }

  p5.draw = () => {
    p5.background( 255 )
  }

  p5.windowResized = () => {
    p5.resizeCanvas(
      document.getElementById( "canvasParent" ).offsetWidth,
      document.getElementById( "canvasParent" ).offsetHeight
    )
  }
    


}

