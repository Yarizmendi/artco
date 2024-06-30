
export default async function InitP5( sketch, parentRef ) {
  const p5 = ( await import( "p5" )).default
  return new p5( async p => sketch( p, parentRef.current ))
}