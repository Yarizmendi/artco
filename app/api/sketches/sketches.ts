

import { getShadersBySketch } from "../shaders/shaders"

export async function getSketchData( title ) {
    const sketchData = await getShadersBySketch( title )
    return sketchData
}