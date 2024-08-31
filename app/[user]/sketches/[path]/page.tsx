
import Sketch from "./PathSketch"
import { getSketchByTitle } from "actions/sketches/getSketchActions"

export default async function Page({ params }) {
  // missing texture model error when using findOne as opposed to find
  const { id, vert, frag, title, images, noises, inputs, displayName, description, textures } = await getSketchByTitle({ title: params.path })

  return <Sketch 
    id={id}
    vert={vert} frag={frag} transitions={false} 
    title={title} displayName={displayName} description={description} 
    images={images} noises={noises} inputs={inputs} textures={textures} />
}
