
let instance

export default async function InitP5( 
  sketch, 
  parentRef, 
  canvasParent,
) {
  let p5 = ( await import( "p5" )).default
  instance = new p5( sketch, parentRef.current )

  instance.windowResized = () => {
    instance.resizeCanvas( canvasParent.offsetWidth, canvasParent.offsetHeight )
  }

}


