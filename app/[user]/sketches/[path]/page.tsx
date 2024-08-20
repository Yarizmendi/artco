
import Sketch from "./PathSketch"
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
  }

  return  <Sketch {...sk} />
}
