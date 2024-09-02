
import { getSKetches } from "actions/sketches/getSketchActions"
import { USERID } from "data/id"

// import sketchModel from "@/mongo/models/sketch.model"

// const sketchInputBody = {
//     "vert": "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/shaders/basic.vert",
//     "frag": "/highway.frag",
//     "blob": "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/highway.jpg",
//     "title": "highway",
//     "display_name": "highway",
//     creatorId: USERID,

//     // noises: [{
//     //     "_id": "66d23819ef9ec71d14e5d9b1",
//     //     "blob": "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/perlin.png",
//     //     "title": "perlin",
//     //     "pathname": "perlin.png",
//     //     "description": "perlin noise",
//     //     "downloadUrl": "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/perlin.png?download=1",
//     //     "uploaderId": "66bd62276d3999b70d5fd91b",
//     //     "createdAt": "2024-08-30T21:22:33.697Z",
//     //     "__v": 0
//     // }],

//     images: [{
//         "blob": "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/highway.jpg",
//         "title": "highway.jpg",
//         "pathname": "highway.jpg",
//         "description": "",
//         "downloadUrl": "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/highway.jpg?download=1",
// }],

//     inputs: [
//         {
//             "icon": "heat",
//             "type": "slider",
//             "label": "waves",
//             "uniform": "u_waves",
//             "settings": {
//                 "min": 0,
//                 "max": 120,
//                 "value": 17,
//                 "step": 1
//             },
//             "description": "controls the strength of the wave affect",
//         },
//         {
//             "icon": "zoom_in_map",
//             "type": "slider",
//             "label": "zoom",
//             "uniform": "u_zoom",
//             "settings": {
//                 "min": 0,
//                 "max": 120,
//                 "step": 1,
//                 "value": 60
//             },
//             "description": "Implements zooming into the upper left corner of the canvas. Value controls how long the zoom should run.",
//         }
//     ],
//     textures: [
//         {
//             "uniform": "u_texture",
//         }
//     ],
    
// }
// await sketchModel.create(sketchInputBody)

export async function GET( req: Request ) {
    const sketches = await getSKetches()
    return Response.json(sketches)
}

