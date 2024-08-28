
import Sketch from "./AffineSketch"
import { getSketchByTitle } from "actions/sketches/getSketchActions"

export default async function Page({ params }) {
  const {
    _id,
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
    id: _id.toString(),
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
