

import { getAllShaders } from "actions/shaders/getShaders"

export async function GET( req: Request ) {
    const data = await getAllShaders()
    return Response.json(data)
}

