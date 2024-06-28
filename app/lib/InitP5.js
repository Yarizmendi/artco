
export default async function InitP5( sketch, parentRef ) {
  const p5 = ( await import( "p5" )).default
  const p = new p5( async p => await sketch( p, parentRef.current ))
  return p
}