

import { createTexture } from "actions/textures/createTexture"
import { deleteTexture } from "actions/textures/deleteTexture"
import { getShaderTextureById, getTextures } from "actions/textures/getTextures"
import { updateTexture } from "actions/textures/updateTexture"


// const textures = await getTextures()
// const tex = await getShaderTextureById("66c450baad1ab00e52056403")


export async function GET( req: Request ) {
    const textures = await getTextures()
    return Response.json(textures)
}

