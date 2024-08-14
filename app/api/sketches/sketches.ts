

import { getShaderInputsBySketch } from "../shaders/inputs/shader_inputs"

export async function getSketchData( title ) {
    const sketchData = await getShaderInputsBySketch( title )
    return sketchData
}