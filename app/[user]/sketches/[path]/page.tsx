
import Sketch from "./PathSketch"
import { getSketchByTitle } from "actions/sketches/getSketchActions"

export default async function Page({ params }) {
  let { id, vert, frag, title, images, noises, inputs, displayName, transitions, description, textures } =  await getSketchByTitle( params.path )
  return  <Sketch id={id} vert={vert} frag={frag} title={title} images={images} noises={noises} inputs={inputs} displayName={displayName} transitions={transitions} description={description} textures={textures} />
}
