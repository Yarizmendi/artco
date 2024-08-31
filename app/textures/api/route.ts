

import { getShaderTextures } from "actions/textures/getShaderTextures"

export async function GET( req: Request ) {
    const data = await getShaderTextures()
    return Response.json(data)
}

