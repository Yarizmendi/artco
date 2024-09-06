
import p5Types from "p5"
let p: p5Types

async function InitP5( 
  sketch,
  parentRef,
) {
  let p5 = ( await import( "p5" )).default
  p = new p5( sketch, parentRef )
  return p
}
export default InitP5