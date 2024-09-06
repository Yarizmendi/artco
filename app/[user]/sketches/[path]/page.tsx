
import { getSketchByTitle } from "actions/sketches/getSketchActions"
import Sketch from "./PathSketch"

export default async function Page({ params }) {
  const { vert, frag, title, images, noises, inputs, displayName, description, textures } = await getSketchByTitle({ title: params.path })

  return <Sketch 
    vert={vert} frag={frag} transitions={false} 
    title={title} displayName={displayName} description={description} 
    images={images} noises={noises} inputs={inputs} textures={textures} />
}
