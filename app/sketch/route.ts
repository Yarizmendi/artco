

import sketchModel from "@/mongo/models/sketch.model"
import { getMongoImageByBlob, getMongoImageById, getMongoImages } from "actions/images/getImages"
import { getShaderInputById } from "actions/shaders/inputs/getInputs"
import { getSKetches } from "actions/sketches/getSketchActions"
import { getShaderTextureById } from "actions/textures/getTextures"
import { USERID } from "data/id"


async function createNewSketch() {

    const imageIds = [
        {
            "title": "red_ocean",
            "path": "red_ocean.png",
            "blob": "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/red_ocean.png"
        },
        {
            "title": "polluted_ocean",
            "id": 1,
            "path": "polluted_ocean.jpg",
            "blob": "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/polluted_ocean.jpg"
        },
        {
            "title": "industrial_ocean",
            "id": 2,
            "path": "industrial_ocean.jpg",
            "blob": "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/industrial_ocean.jpg"
        },
        {
            "title": "your_ocean_changed",
            "id": 3,
            "path": "your_ocean_changed.png",
            "blob": "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/your_ocean_changed.png"
        }
    ]

    const textureIds = [
    "66c023dd5b84addbc1675f72"
    ]

    const inputIds =  [
    "66c0231a26fb9c0fdb5b1f71",
    "66c450baad1ab00e52056403",
    ]

    const noiseIds = [
        "66d23819ef9ec71d14e5d9b1"
    ]

    const resImageIds = []
    for (let i=0; i<imageIds.length; i++) {
    const mongoImg = await getMongoImageByBlob( imageIds[i].blob )
    resImageIds.push(mongoImg._id)
    }

    const resInputIds = []
    for (let i=0; i<inputIds.length; i++) {
    const input = await getShaderInputById( inputIds[i] )
    resInputIds.push(input._id)
    }

    const resTextureIds = []
    for (let i=0; i<textureIds.length; i++) {
    const texture = await getShaderTextureById( textureIds[i] )
    resTextureIds.push(texture._id)
    }

    const resNoiseIds = []
    for (let i=0; i<noiseIds.length; i++) {
    const noise = await getMongoImageById( noiseIds[i] )
    resNoiseIds.push(noise._id)
    }


    const create = await sketchModel
    .create({
        creatorId: USERID,
        title: "oceans",
        displayName: "Ocean Listening",

        vert: "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/shaders/basic.vert",
        frag: "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/shaders/oceans.frag",
        blob: "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/red_ocean.png",

        inputs: resInputIds,
        textures: resTextureIds,
        images: resImageIds,
        noises: resNoiseIds
    })
    console.log(create)
}

export async function GET( req ) {
    const sketches = await sketchModel.findOne({ title: "oceans"}).populate(["inputs", "textures", "images", "noises"]).exec()
    return Response.json(sketches)
}
