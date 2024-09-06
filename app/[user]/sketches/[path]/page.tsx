
import { getPreviewCollectionSketch, getSketchByTitle } from "actions/sketches/getSketchActions"
import Sketch from "./PathSketch"
import { getUserImgCollectionById } from "actions/images/getImages"



export default async function Page({ params }) {

  const { vert, frag, title, noises, inputs, displayName, description, textures, transitions } = getPreviewCollectionSketch()
  const {images} = await getUserImgCollectionById("66da83cf5d6b96614f57d6aa")


  // // if (!isPreview) {
  // //   const { vert, frag, title, images, noises, inputs, displayName, description, textures, transitions } = await getSketchByTitle({ title: params.path })
  // //   return (
  // //     <Sketch 
  // //     vert={vert} frag={frag} transitions={transitions} 
  // //     title={title} displayName={displayName} description={description} 
  // //     images={images} noises={noises} inputs={inputs} textures={textures} />
  // //   )
  // // }



  // // if (isPreview=="collection") {
  //   // const { vert, frag, title, images, noises, inputs, displayName, description, textures, transitions } = await getPreviewCollectionSketch({ collectionId: params.path.split("-")[1]})
  //   // console.log(images)
  //   // return ( 
  //   //   <Sketch 
  //   //   vert={vert} frag={frag} transitions={transitions} 
  //   //   title={title} displayName={displayName} description={description} 
  //   //   images={images} noises={noises} inputs={inputs} textures={textures} />
  //   // )
  // //  }

    return ( 
      <Sketch images={images}
      vert={vert} frag={frag} transitions={transitions} 
      title={title} displayName={displayName} description={description} 
       noises={noises} inputs={inputs} textures={textures} />
    )

  }



