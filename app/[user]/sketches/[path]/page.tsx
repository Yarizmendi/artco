
import Sketch from "./Refactor"
import { getUserImgCollectionById, getMongoImageById } from "actions/images/getImages"
import { getPreviewCollectionSketch, getPreviewPaintingSketch, getSketchById } from "actions/sketches/getSketchActions"

export default async function Page({ params }) {
  let frag
  const [id, type, title] = params.path.split("-")
  const shaderOptions = await fetch("https://artco.netlify.app/api/shaders", { mode: "cors" }).then(res => res.json())

  // if ( type == "collection") {
  //   const {vert, frag, title, noises, inputs, displayName, description, textures, transitions} = getPreviewCollectionSketch()
  //   let {images} = await getUserImgCollectionById(id)
  //   images = images.sort((a,b) => Number(a.positionIdx) - Number(b.positionIdx))

  //   console.log(type, title, frag)

  //   return ( 
  //     <Sketch images={images}
  //     vert={vert} frag={frag} transitions={transitions} 
  //     title={title} displayName={displayName} description={description} 
  //     noises={noises} inputs={inputs} textures={textures} />
  //   )
  // }

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
    if (title == "inbound8661079161443213041.jpg") frag = "/walking.frag"
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
    if (!frag) frag = "/concept.frag"
    if (title == "kk") frag = "/kk.frag"

    console.log(type, title, inputs)

    return ( 
      <Sketch frag={frag} shaderOptions={shaderOptions}
      images={images}
      vert={vert}  transitions={transitions} 
      title={title} displayName={displayName} description={description} 
      noises={noises} inputs={inputs} textures={textures} />
    )
  }

}



