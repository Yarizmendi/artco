
import { getInputs } from "actions/shaders/inputs/getInputs"

export async function GET( req: Request ) {
    const data = await getInputs()
    return Response.json(data)
}

