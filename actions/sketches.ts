
import { getImagesBySketch } from "./images"
import { ID, TITLE, DESCRIPTION, getInputsBySketch } from "./inputs"
import { getShadersBySketch } from "./shaders"
import { getBlobCollection } from "./blobs"

const sketches = {
    "ocean" : {
        images: [],
        shaders: [],

        blobs: [],

        inputs: [],
        textures: [],
        timers: [],

        id: ID,
        title: "ocean",
        description: DESCRIPTION,
    }
}

export async function getSketchData( title = "ocean" ) {
    const sketch = sketches[ title ]

    const images = await getImagesBySketch( title )
    const blobs = await getBlobCollection( images )
    const shaders = await getShadersBySketch( title )
   
    sketch.blobs = blobs
    sketch.images = images
    sketch.shaders = shaders

    sketch.inputs = shaders[0].inputs
    sketch.timers = shaders[0].timers
    sketch.textures = shaders[0].textures

    return sketch
}