
import Sketch from "./[user]/sketches/[path]/Stealth"
import { getSketchById } from "actions/sketches/getSketchActions"

export default async function Sketches({ params }) {
    const { images, vert, frag, title, noises, inputs, displayName, description, textures, transitions} = await getSketchById({ _id: "66d3697ed8d646c1917777d0" })
    return ( 
        <Sketch images={images}
        vert={vert} frag={frag} transitions={transitions} 
        title={title} displayName={displayName} description={description} 
        noises={noises} inputs={inputs} textures={textures} />
      )
}

