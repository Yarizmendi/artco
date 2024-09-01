
// import inputModel from "@/mongo/models/input.model"
import { getInputs } from "actions/shaders/inputs/getInputs"

export async function GET( req: Request ) {
    const data = await getInputs()
    return Response.json(data)
}

// await inputModel.create({
//     "icon": "timer",
//     "type": "slider",
//     "label": "threshold",
//     "uniform": "u_timeout",
//     "settings": {
//         "min": 0,
//         "max": 1,
//         "value": 100,
//         "step": 1
//     },
//     "description": "percentage of mixture",
// })

