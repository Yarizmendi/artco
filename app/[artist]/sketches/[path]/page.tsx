
import { Mongo } from "@/mongo/index"
import Sketch from "views/PathSketch"

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
  } =  await Mongo.db("test").collection("sketches").findOne({ title: params.path })

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
