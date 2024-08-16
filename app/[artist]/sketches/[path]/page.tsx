
import Sketch from "views/PathSketch"
import { getSKetch } from "actions/sketchActions"

export default async function Page({ params }) {
  const {
    vert,
    frag,
    title, 
    images,
    noises,
    shaders, 
    textures,
    displayName,
    transitions,
  } =  await getSKetch( params.path )

  return <Sketch 
    vert={vert}
    frag={frag}
    title={title}
    images={images}
    noises={noises}
    shaders={shaders}
    textures={textures}
    displayName={displayName}
    transitions={transitions}
  />
}
