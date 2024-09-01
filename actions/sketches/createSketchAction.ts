
"use server"
import connect from 'mongo/index.js'
import SketchModel from '@/mongo/models/sketch.model'
import { getMongoImageById } from 'actions/images/getImages'
import { getShaderInputById } from 'actions/shaders/inputs/getInputs'
import { getShaderTextureById } from 'actions/textures/getTextures'


export async function createSketchAction ( formData: FormData ) {
    const id = formData.get("creatorId")
    const title = formData.get("title")

    let images = formData.get("images") as string
    let inputs = formData.get("inputs") as string
    let textures = formData.get("textures") as string

    let transitions = formData.get("transitions")

    const image =  await getMongoImageById( images )
    const input =  await getShaderInputById( inputs )
    const texture =  await getShaderTextureById( textures )

    const sketchInputBody = {
        vert: "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/shaders/basic.vert",
        frag: formData.get("frag"),
        blob: formData.get("blob"),
        title: title,
        creatorId: id,
        displayName: formData.get("displayName"),
        description: formData.get("description"),
        transitions: transitions == "false" ? false : true,

        // noises: [{
        //     "_id": "66d23819ef9ec71d14e5d9b1",
        //     "blob": "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/perlin.png",
        //     "title": "perlin",
        //     "pathname": "perlin.png",
        //     "description": "perlin noise",
        //     "downloadUrl": "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/perlin.png?download=1",
        //     "uploaderId": "66bd62276d3999b70d5fd91b",
        //     "createdAt": "2024-08-30T21:22:33.697Z",
        //     "__v": 0
        // }],

        images: [image],
        inputs: [
            {
                "_id": "66c0231a26fb9c0fdb5b1f71",
                "icon": "heat",
                "type": "slider",
                "label": "waves",
                "uniform": "u_waves",
                "settings": {
                    "min": 0,
                    "max": 100,
                    "value": 4,
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
                    "min": "0",
                    "max": "60",
                    "step": "1",
                    "value": 60
                },
                "description": "Implements zooming into the upper left corner of the canvas. Value controls how long the zoom should run.",
                "__v": 0
            }
        ],
        textures: [texture],
        
    }

    await connect()
    await SketchModel.create(sketchInputBody)
}