
import { getSKetches } from "actions/sketches/getSketchActions"
import { USERID } from "data/id"

// import sketchModel from "@/mongo/models/sketch.model"

const sketchInputBody =     {
    creatorId: USERID,
    "tags": {
        "object": [],
        "meta": []
    },
    "vert": "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/shaders/basic.vert",
    "frag": "/ip.frag",
    "blob": "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/FB_IMG_1713503445653.jpg",
    "title": "intellectual property",
    "textures": [
        {
            "uniform": "u_texture"
        }
    ],
    "images": [
        {
            "blob": "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/FB_IMG_1713503445653.jpg",
            "title": "ip",
            "pathname": "FB_IMG_1713503445653.jpg",
            "description": "",
            "downloadUrl": "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/FB_IMG_1713503445653.jpg?download=1",
            "createdAt": "2024-09-01T01:09:19.078Z",
            "displayName": "intellectual property"
        }
    ],
    "inputs": [
        {
            "icon": "heat",
            "type": "slider",
            "label": "waves",
            "uniform": "u_waves",
            "settings": {
                "min": 0,
                "max": 120,
                "value": 4,
                "step": 1
            },
            "description": "controls the strength of the wave affect"
        },
        {
            "icon": "zoom_in_map",
            "type": "slider",
            "label": "zoom",
            "uniform": "u_zoom",
            "settings": {
                "min": 0,
                "max": 120,
                "step": 1,
                "value": 9
            },
            "description": "Implements zooming into the upper left corner of the canvas. Value controls how long the zoom should run."
        }
    ],
    "createdAt": "2024-09-01T16:45:02.344Z",
    "description": "",
    "displayName": "intellectual property"
}

// await sketchModel.create(sketchInputBody)

export async function GET( req: Request ) {
    const sketches = await getSKetches()
    return Response.json(sketches)
}

