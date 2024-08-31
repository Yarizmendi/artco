
import connect from 'mongo/index.js'
import SketchModel from '@/mongo/models/sketch.model.js'
import { getMongoImageByTitle } from 'actions/images/getImages'

export async function getSKetches () {
    await connect()
    return SketchModel.find().select("-__v -creatorId -uploaderId").exec()
}

export async function getSKetchesByCreatorId ({ creatorId }) {
    await connect()
    return await SketchModel.find({ creatorId }).populate(["inputs", "textures"]).select("-__v -creatorId").sort({ createdAt: "desc"}).exec()
}

export async function getSketchByTitle (sketchTitle) {
    await connect()
    const sk = await SketchModel.findOne({ title: sketchTitle }).populate(["inputs", "textures", "images", "noises"]).exec()

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
    const sketches = await SketchModel.findOne({ _id: id }).populate(["inputs", "textures"]).select("-__v -creatorId -uploaderId").exec()
    return sketches
}

export async function replaceSketchTextures( title, textures ) {
    await connect()
    return await SketchModel
      .findOneAndUpdate({ title }, { textures })
      .exec()
}