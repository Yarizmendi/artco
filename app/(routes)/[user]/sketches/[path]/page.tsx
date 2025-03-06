
"use client"

import { UseShaders } from "@/api/vercel/shaders/UseShaders"
import Sketch from "./Refactor"
import { getUserImgCollectionById, getMongoImageById } from "actions/images/getImages"
import { getPreviewCollectionSketch, getPreviewPaintingSketch, getSketchById } from "actions/sketches/getSketchActions"

export default async function Page({ params }) {
  let frag
  const [id, type, title] = params.path.split("-")

  const { data, error, isLoading, isValidating, mutate } = UseShaders()
  const shaderOptions = data
  console.log(shaderOptions)

  if ( type == "collection") {
    const {vert, frag, title, noises, inputs, displayName, description, textures, transitions} = getPreviewCollectionSketch()
    let {images} = await getUserImgCollectionById(id)
    images = images.sort((a,b) => Number(a.positionIdx) - Number(b.positionIdx))

    return ( 
      <Sketch images={images} shaderOptions={shaderOptions}
      vert={vert} frag={frag} transitions={transitions} 
      title={title} displayName={displayName} description={description} 
      noises={noises} inputs={inputs} textures={textures} />
    )
  }

  if ( type == "sketch" ) {
   const { vert, frag, title, images, noises, inputs, displayName, description, textures, transitions } = await getSketchById(id)
    return ( 
      <Sketch images={images} shaderOptions={shaderOptions}
      vert={vert} frag={frag} transitions={transitions} 
      title={title} displayName={displayName} description={description} 
      noises={noises} inputs={inputs} textures={textures} />
    )
  }

  if ( type == "painting") {
    let {vert, noises, inputs, displayName, description, textures, transitions} = getPreviewPaintingSketch(title)
    const images = [await getMongoImageById(id)]

    if (title == "window") frag = "/window.frag"
    if (title == "fountain") frag = "/fountain.frag"
    if (title == "luigi") {
      frag = "/luigi.frag"
      inputs = [
        {
            "icon": "zoom_in_map",
            "type": "slider",
            "label": "waves",
            "uniform": "u_waves",
            "settings": {
                "min": 0,
                "max": 10,
                "step": 1,
                "value": 2
            },
            "description": "Implements zooming into the upper left corner of the canvas. Value controls how long the zoom should run.",
        },
        {
            "icon": "zoom_in_map",
            "type": "slider",
            "label": "zoom",
            "uniform": "u_zoom",
            "settings": {
                "min": 0,
                "max": 120,
                "step": 1,
                "value": 60
            },
            "description": "Implements zooming into the upper left corner of the canvas. Value controls how long the zoom should run.",
        }
    ]
    }
    if (!frag) frag = "/test.frag"

    return ( 
      <Sketch frag={frag} shaderOptions={shaderOptions}
      images={images}
      vert={vert}  transitions={transitions} 
      title={title} displayName={displayName} description={description} 
      noises={noises} inputs={inputs} textures={textures} />
    )
  }

}



