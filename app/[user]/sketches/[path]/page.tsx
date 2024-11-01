
import Sketch from "./PathSketch"
import { getUserImgCollectionById, getMongoImageById } from "actions/images/getImages"
import { getPreviewCollectionSketch, getPreviewPaintingSketch, getSketchById } from "actions/sketches/getSketchActions"

export default async function Page({ params }) {
  const [id, type, title] = params.path.split("-")

  if ( type == "collection") {
    const {vert, frag, title, noises, inputs, displayName, description, textures, transitions} = getPreviewCollectionSketch()
    let {images} = await getUserImgCollectionById(id)
    images = images.sort( (a,b) => Number(a.positionIdx) - Number(b.positionIdx) )

    return ( 
      <Sketch images={images}
      vert={vert} frag={frag} transitions={transitions} 
      title={title} displayName={displayName} description={description} 
      noises={noises} inputs={inputs} textures={textures} />
    )
  }

  if ( type == "sketch" ) {
   const { vert, frag, title, images, noises, inputs, displayName, description, textures, transitions } = await getSketchById(id)
    return ( 
      <Sketch images={images}
      vert={vert} frag={frag} transitions={transitions} 
      title={title} displayName={displayName} description={description} 
      noises={noises} inputs={inputs} textures={textures} />
    )
  }

  if ( type == "painting") {
    const {vert, noises, inputs, displayName, description, textures, transitions} = getPreviewPaintingSketch(title)
    const images = [await getMongoImageById(id)]

    let song, frag


    if ( title == "fountain" ) frag = "/fountain.frag"
    if ( title == "grateful_dead") frag = "/grateful.frag"


    return ( 
      <Sketch frag={frag} images={images}
      vert={vert}  transitions={transitions} 
      title={title} displayName={displayName} description={description} 
      noises={noises} inputs={inputs} textures={textures} />
    )
  }

}



