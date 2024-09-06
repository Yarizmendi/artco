
import connect from 'mongo/index.js'
import SketchModel from '@/mongo/models/sketch.model.js'
import { getMongoImageByTitle } from 'actions/images/getImages'

export async function getSKetches () {
    await connect()
    return SketchModel.find().select("-__v -creatorId -uploaderId").sort({ createdAt: "desc"}).exec()
}

export async function getSKetchesByCreatorId ({ creatorId }) {
    await connect()
    return await SketchModel.find({ creatorId }).select("-__v -creatorId -uploaderId").sort({ createdAt: "desc"}).exec()
}

export async function getSketchByTitle ({ title }) {
    await connect()
    const sk = await SketchModel.findOne({ title }).exec()

    const newSketch = {
        vert: "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/shaders/basic.vert",
        frag: "/matrixScale.frag",
        title: title,
        displayName: "Image",
        description: "User image sketch",
        transitons: false, 
        inputs: [
            {
                "icon": "heat",
                "type": "slider",
                "label": "waves",
                "uniform": "u_waves",
                "settings": {
                    "min": 0,
                    "max": 240,
                    "value": 100,
                    "step": 1
                },
                "description": "controls the strength of the wave affect",
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
                    "value": 90
                },
                "description": "Implements zooming into the upper left corner of the canvas. Value controls how long the zoom should run.",
            },
        ],
        textures: [
            {
                "uniform": "u_texture",
            },
        ],
    }

    if ( !sk ) {
      const clickedImg =  await getMongoImageByTitle(title )
      newSketch["images"] = [ clickedImg ]
      return newSketch
    } else return sk
}

export async function getSketchById (id) {
    await connect()
    const sketches = await SketchModel.findOne({ _id: id }).select("-__v -creatorId -uploaderId").exec()
    return sketches
}



// const newSketch = {
//     id: 0,
//     vert: "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/shaders/basic.vert",
//     frag: "/new.frag",
//     title: 'image',
//     displayName: "Image Sketch",
//     description: "User image sketch",
//     transitons: false, 
//     inputs: [
//         {
//             icon: 'heat',
//             type: 'slider',
//             label: 'waves',
//             uniform: 'u_waves',
//             description: 'amplitude of trig function',
//             settings: { min: 0, max: 100, step: 1, value: 10 }
//         },
//     ],
//     textures: [
//         { uniform: "u_texture", type: "texture"}
//     ]
// }

// if ( !sk ) {
//   const clickedImg =  await getMongoImageByTitle(sketchTitle )
//   newSketch["images"] = [ clickedImg ]
//   return newSketch
// }