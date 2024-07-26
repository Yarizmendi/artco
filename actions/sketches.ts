
import { getImagesBySketch } from "./images"
import { ID, TITLE, DESCRIPTION, getInputsBySketch } from "./inputs"
import { getShadersBySketch } from "./shaders"
import { getBlobCollection } from "./blobs"

const sketches = {
    "ocean" : {
        shaders: [],
        images: [],
        inputs: [],
        blobs: [],
        id: ID,
        title: "ocean",
        description: DESCRIPTION,
    }
}

export async function getSketchData( title = "ocean" ) {
    const sketch = sketches[ title ]

    const images = await getImagesBySketch( title )
    const blobs = await getBlobCollection( images )
    const inputs = await getInputsBySketch( title )
    const shaders = await getShadersBySketch( title )

    sketch.blobs = blobs
    sketch.images = images
    sketch.inputs = inputs
    sketch.shaders = shaders
 
    return sketch
}