
import { getVercelShadersAction } from "actions/blobs/getVercelShadersAction"
import { getSketchById } from "actions/sketches/getSketchActions"
import Sketch from "../../Refactor"
import NoSSR from "app/NoSSR"

export default async function SavedSketches({ params }) {
    const { vert, frag, title, images, noises, inputs, displayName, description, textures, transitions } = await getSketchById(params.sketchwork)
      // shader option dropdown has empty value because vercel returns folder first
      let shaderOptions = await getVercelShadersAction()
      shaderOptions = shaderOptions.splice(1)
    return ( 
        <NoSSR>
           <Sketch frag={frag} shaderOptions={shaderOptions}
           images={images}
           vert={vert}  transitions={transitions} 
           title={"preview"} displayName={displayName} description={description} 
           noises={noises} inputs={inputs} textures={textures} />
         </NoSSR>
    )
}
