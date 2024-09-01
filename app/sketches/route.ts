
import { getSketchByTitle, getSKetches } from "actions/sketches/getSketchActions"
import { USERID } from "data/id"

// import sketchModel from "@/mongo/models/sketch.model"

const sketchInputBody = {
    "vert": "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/shaders/basic.vert",
    "frag": "/alice.frag",
    "blob": "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/alice_falls.webp",
    "title": "alice_II_inverted",
    creatorId: USERID,

    noises: [{
        "_id": "66d23819ef9ec71d14e5d9b1",
        "blob": "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/perlin.png",
        "title": "perlin",
        "pathname": "perlin.png",
        "description": "perlin noise",
        "downloadUrl": "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/perlin.png?download=1",
        "uploaderId": "66bd62276d3999b70d5fd91b",
        "createdAt": "2024-08-30T21:22:33.697Z",
        "__v": 0
    }],

    images: [
        {
            "_id": "66d36efed8d646c191777832",
            "blob": "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/alice_falls.webp",
            "title": "alice_falls",
            "pathname": "alice_falls.webp",
            "downloadUrl": "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/alice_falls.webp?download=1",
            "createdAt": "2024-08-31T19:29:02.505Z"
        },
    ],

    inputs: [
        {
            "_id": "66c0231a26fb9c0fdb5b1f71",
            "icon": "heat",
            "type": "slider",
            "label": "waves",
            "uniform": "u_waves",
            "settings": {
                "min": 0,
                "max": 120,
                "value": 2,
                "step": 1
            },
            "description": "controls the strength of the wave affect",
            "__v": 0
        },
        {
            "_id": "66c450baad1ab00e52056403",
            "icon": "zoom_in_map",
            "type": "slider",
            "label": "zoom",
            "uniform": "u_zoom",
            "settings": {
                "min": 0,
                "max": 120,
                "step": 1,
                "value": 10
            },
            "description": "Implements zooming into the upper left corner of the canvas. Value controls how long the zoom should run.",
            "__v": 0
        }
    ],
    textures: [
        {
            "_id": "66c023dd5b84addbc1675f72",
            "uniform": "u_texture",
            "__v": 0
        }
    ],
    
}
// await sketchModel.create(sketchInputBody)

export async function GET( req: Request ) {
    const sketches = await getSketchByTitle({ title: "alice" })
    return Response.json(sketches)
}

