
export default async function InitP5( sketch, parentRef ) {
  let p5 = ( await import( "p5" )).default
  return new p5( sketch, parentRef.current )
}