import { getMongoImageById, getUserNotes } from "actions/images/getImages"
import { getPreviewPaintingSketch } from "actions/sketches/getSketchActions"
import Sketch from "../../Refactor"
import { getVercelShadersAction } from "actions/blobs/getVercelShadersAction"
import NoSSR from "app/NoSSR"

function createImagesLinkedList({ transitionImages }) {
  /**
   * creates a linked list for transitioning through images in a closed loop for p5 sketch.
   * Mongoose returns an iterable of mongo documents, so must convert to js primatives
   */
  const amendedList: any[] = transitionImages
  const imageNodes: Array<object> = []

  for (let i=0; i<amendedList.length; i++) {
    let imageNode = amendedList[i].toObject()
    if ( i === amendedList.length-1) imageNode.next = 0
    else imageNode.next = i+1
    imageNodes.push(imageNode)
  } 

  return imageNodes
}

export default async function ArtworkSketch({ params }) {
  let { vert, noises, inputs, displayName, description, textures, transitions, frag } = getPreviewPaintingSketch("preview")
  const images = [(await getMongoImageById(params.artwork))]

  const transitionImages = await getUserNotes({})
  const notes = createImagesLinkedList({ transitionImages })

  // shader option dropdown has empty value because vercel returns folder first
  const shaderOptions = (await getVercelShadersAction()).splice(1)

     return ( 
      <NoSSR>
        <Sketch frag={frag} shaderOptions={shaderOptions} images={images}
        vert={vert}  transitions={transitions} notes={notes}
        title={"preview"} displayName={displayName} description={description} 
        noises={noises} inputs={inputs} textures={textures} />
      </NoSSR>
    )
}




