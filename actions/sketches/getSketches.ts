
import connect from 'mongo/index.js'
import SketchModel from '@/mongo/models/sketch.model.js'
import { getMongoImageById, getMongoImageByTitle } from 'actions/images/getImages'

export async function getSKetches () {
    await connect()
    const sketches = SketchModel.find().exec()
    return sketches
}

export async function getSKetchesByCreatorId ({ creatorId }) {
    await connect()
    const sketches = SketchModel.find({ creatorId }).exec()
    return sketches
}

export async function getSketchByTitle (sketchTitle) {
    await connect()
    const sk = await SketchModel.findOne({ title: sketchTitle }).select("-__v -creatorId").exec()
    const newSketch = {
        id: 0,
        vert: "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/shaders/basic.vert",
        frag: "/new.frag",
        title: 'image',
        displayName: "Image Sketch",
        description: "User image sketch",
        transitons: false, 
        inputs: [
            {
                icon: 'heat',
                type: 'slider',
                label: 'waves',
                uniform: 'u_waves',
                description: 'amplitude of trig function',
                settings: { min: 0, max: 100, step: 1, value: 10 }
            },
        ],
        textures: [
            { uniform: "u_texture", type: "texture"}
        ]
    }

    if ( !sk ) {
      const clickedImg =  await getMongoImageByTitle(sketchTitle )
      newSketch["images"] = [ clickedImg ]
      return newSketch
    }

    else return sk
}

export async function getSketchById (id) {
    await connect()
    const sketches = SketchModel.findOne({ _id: id }).exec()
    return sketches
}