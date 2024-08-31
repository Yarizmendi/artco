

import shaderModel from "@/mongo/models/shader.model"
import { getAllShaders } from "actions/shaders/getShaders"


// await shaderModel.create({
//     title: "Mix Shader",
//     description: "simple mix",
//     icon: "instant_mix",
//     inputIds: [],
//     textureIds: [
//         "66c023dd5b84addbc1675f72",
//         "66d31d673df76d776c2d953e"
//     ],
// })

export async function GET( req: Request ) {
    const shaders = await getAllShaders()
    return Response.json(shaders[1])
}

