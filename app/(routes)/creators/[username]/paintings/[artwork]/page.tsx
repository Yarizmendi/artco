import { getMongoImageById } from "actions/images/getImages"
import { getPreviewPaintingSketch } from "actions/sketches/getSketchActions"
import Sketch from "../../../../[user]/sketches/[path]/Refactor"
import { getVercelShadersAction } from "actions/blobs/getVercelShadersAction"
import NoSSR from "app/NoSSR"

export default async function ArtworkSketch({ params }) {
  let {vert, noises, inputs, displayName, description, textures, transitions, frag} = getPreviewPaintingSketch("preview")
  const images = [await getMongoImageById(params.artwork)]

  let shaderOptions = await getVercelShadersAction()
  // shader option dropdown has empty value because vercel returns folder first
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




