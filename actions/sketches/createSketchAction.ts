
"use server"
import connect from 'mongo/index.js'
import SketchModel from '@/mongo/models/sketch.model'
import { getMongoImageById } from 'actions/images/getImages'

export async function createSketchAction ( formData: FormData ) {

    const imageId = formData.get("image")
    const image = await getMongoImageById(imageId)

    const sketchInputBody = {
        // @ts-ignore
        blob: image.blob,
        vert: "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/shaders/basic.vert",
        frag: formData.get("frag"),

        title: formData.get("title"),
        creatorId: formData.get("creatorId"),
        displayName: formData.get("displayName"),
        description: formData.get("description"),
        transitions: false,

        images: [image],

        inputs: [
            {
                "icon": "zoom_in_map",
                "type": "slider",
                "label": "waves",
                "uniform": "u_waves",
                "settings": {
                    "min": 0,
                    "max": 150,
                    "step": 1,
                    "value": 10
                },
                "description": "Implements zooming into the upper left corner of the canvas. Value controls how long the zoom should run.",
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
                    "value": 120
                },
                "description": "Implements zooming into the upper left corner of the canvas. Value controls how long the zoom should run.",
            }
        ],
        textures: [
            {"uniform": "u_texture"},
        ],
        noises: [
            {blob:"https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/perlin.png"}
        ]
        
    }

    console.log(sketchInputBody)

    await connect()
    await SketchModel.create(sketchInputBody)
}