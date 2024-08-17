
import Sketch from "./PathSketch"
import { getSKetch } from "@/mongo/actions/sketchActions"

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
  } =  await getSKetch( params.path )


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
