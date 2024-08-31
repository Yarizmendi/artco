

import inputModel from "@/mongo/models/input.model"
import { getInputs } from "actions/shaders/inputs/getInputs"


// const input = await inputModel.updateOne(
//     { label: "waves"},
//     { description: "controls the strength of the wave affect" }
// )

export async function GET( req: Request ) {
    const data = await getInputs()
    return Response.json(data)
}

