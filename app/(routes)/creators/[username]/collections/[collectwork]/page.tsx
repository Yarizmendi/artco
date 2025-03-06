import { getMongoImageById, getUserImgCollectionById } from "actions/images/getImages"
import { getPreviewCollectionSketch, getPreviewPaintingSketch } from "actions/sketches/getSketchActions"
import { getVercelShadersAction } from "actions/blobs/getVercelShadersAction"
import NoSSR from "app/NoSSR"
import Sketch from "../../Refactor"

export default async function CollectionSketch({ params }) {
  const {vert, frag, title, noises, inputs, displayName, description, textures, transitions} = getPreviewCollectionSketch()
  
  let {images} = await getUserImgCollectionById(params.collectwork)
  images = images.sort((a,b) => Number(a.positionIdx) - Number(b.positionIdx))

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




