
import { getImagesBySketch, getNoisesBySketch } from "../app/api/images/images"
import { DESCRIPTION, getShadersBySketch, ID } from "./shaders"

export async function getSketchData( title ) {
    const noises = await getNoisesBySketch( title )
    const images = await getImagesBySketch( title )
    const shaders = await getShadersBySketch( title )

    const sketch = {
        id: ID,
        images: images,
        noises: noises,
        shaders: shaders,
        title: title,
        description: DESCRIPTION,
    }
    
    return sketch
}