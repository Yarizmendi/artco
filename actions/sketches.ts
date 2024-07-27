
import { getImagesBySketch } from "./images"
import { DESCRIPTION, getShadersBySketch, ID } from "./shaders"

const sketches = {
    "oceans" : {
        images: [],
        shaders: [],
        id: ID,
        title: "oceans",
        description: DESCRIPTION,
    },
    "city" : {
        images: [],
        shaders: [],
        id: ID,
        title: "city",
        description: DESCRIPTION,
    },
    "stem" : {
        images: [],
        shaders: [],
        id: ID,
        title: "stem",
        description: DESCRIPTION,
    }
}

export async function getSketchData( title ) {
    const sketch = sketches[ title ]
    const images = await getImagesBySketch( title )
    const shaders = await getShadersBySketch( title )
    sketch.images = images
    sketch.shaders = shaders
    return sketch
}