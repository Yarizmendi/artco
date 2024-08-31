
import Sketch from "./AffineSketch"
import { getSketchByTitle } from "actions/sketches/getSketchActions"

export default async function Page({ params }) {
  const {
    id,
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
    id,
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
