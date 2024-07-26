
import { getImageData, getImagesBySketch } from "./images"
import { ID, TITLE, DESCRIPTION, getInputData } from "./inputs"
import { getShaderData, getShadersBySketch } from "./shaders"
import { getBlobCollection } from "./blobs"

let sketch = {
    shaders: [],
    images: [],
    inputs: [],
    id: ID,
    title: TITLE,
    description: DESCRIPTION,
}

const sketches = {
    "ocean" : {
        shaders: [],
        images: [],
        inputs: [],
        id: ID,
        title: TITLE,
        description: DESCRIPTION,
    }
}

export async function getSketchData( title = "ocean" ) {
    sketch = sketches[ title ]

    sketch.shaders = await getShadersBySketch( title )
    sketch.images = await getImagesBySketch( title )

    sketch.shaders[0].inputs.map( async inptKey => {
        sketch.inputs.push( await getInputData( inptKey ))
    })
    
 
   
    // const imageBlobs = await getBlobCollection( imagePaths )
    // sketches[ title ].images = imagePaths
    // sketches[ title ].inputs = inputValues
    // sketches[ title ].shaders = shaders

    return sketch

}