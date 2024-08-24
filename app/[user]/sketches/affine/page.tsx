
import Sketch from "./AffineSketch"
import { getSketchByTitle } from "actions/sketches/getSketches"

export default async function Page({ params }) {
  const {
    vert,
    frag,
    title, 
    images,
    noises,
    inputs, 
    textures,
    displayName,
    transitions,
    description
  } =  await getSketchByTitle( params.path )

  const sk = {
    vert,
    frag,
    title, 
    images,
    noises,
    inputs,
    textures,
    displayName,
    transitions,
    description
  }

  return  <Sketch {...sk} />
}
