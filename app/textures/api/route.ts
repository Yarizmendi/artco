
import { getTextures } from "actions/textures/getTextures"

export async function GET( req: Request ) {
    const textures = await getTextures()
    return Response.json(textures)
}

