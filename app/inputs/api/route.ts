

import { getShaderInputs } from "actions/inputs/getShaderInputs"

export async function GET( req: Request ) {
    const data = await getShaderInputs()
    return Response.json(data)
}

