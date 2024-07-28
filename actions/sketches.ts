
import { getImagesBySketch, getNoisesBySketch } from "./images"
import { DESCRIPTION, getShadersBySketch, ID } from "./shaders"

export async function getSketchData( title ) {
    const noises = await getNoisesBySketch( title )
    const images = await getImagesBySketch( title )
    const shaders = await getShadersBySketch( title )

    const sketch = {
        id: ID,
        images: [],
        noises: [],
        shaders: [],
        title: title,
        description: DESCRIPTION,
    }

    sketch["images"] = images
    sketch["noises"] = noises
    sketch["shaders"] = shaders
    
    return sketch
}