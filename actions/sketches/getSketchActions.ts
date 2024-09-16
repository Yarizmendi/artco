
import connect from 'mongo/index.js'
import SketchModel from '@/mongo/models/sketch.model.js'

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
    return await SketchModel.findOne({ title }).select("-__v -creatorId -uploaderId").exec()
}

export async function getSketchById (id) {
    await connect()
    const sketches = await SketchModel.findOne({ _id: id }).select("-__v -creatorId -uploaderId").exec()
    return sketches
}

export function getPreviewCollectionSketch() {

    return {
        vert: "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/shaders/basic.vert",
        frag: "/stem.frag",
        title: "preview_collection",
        displayName: "Image",
        description: "Preview Collection Sketch",
        transitions: true, 
        inputs: [
            {
                "icon": "zoom_in_map",
                "type": "slider",
                "label": "waves",
                "uniform": "u_waves",
                "settings": {
                    "min": 0,
                    "max": 100,
                    "step": 1,
                    "value": 5
                },
                "description": "Implements zooming into the upper left corner of the canvas. Value controls how long the zoom should run.",
            },
            {
                "icon": "zoom_in_map",
                "type": "slider",
                "label": "range",
                "uniform": "u_range",
                "settings": {
                    "min": 0,
                    "max": 1,
                    "step": .1,
                    "value": .25
                },
                "description": "Implements zooming into the upper left corner of the canvas. Value controls how long the zoom should run.",
            },
            // {
            //     "icon": "zoom_in_map",
            //     "type": "slider",
            //     "label": "threshold",
            //     "uniform": "u_threshold",
            //     "settings": {
            //         "min": 0,
            //         "max": 1,
            //         "step": .01,
            //         "value": .5
            //     },
            //     "description": "Implements zooming into the upper left corner of the canvas. Value controls how long the zoom should run.",
            // },
            {
                "icon": "zoom_in_map",
                "type": "slider",
                "label": "timer",
                "uniform": "u_timeout",
                "settings": {
                    "min": 0,
                    "max": 60,
                    "step": 1,
                    "value": 9
                },
                "description": "Implements zooming into the upper left corner of the canvas. Value controls how long the zoom should run.",
            },
        ],
        textures: [
            { "uniform": "u_background"},
            { "uniform": "u_foreground"},
        ],

        noises: [{ blob:"https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/perlin.png"}]
    }

}

export function getPreviewPaintingSketch(title) {

    return {
        vert: "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/shaders/basic.vert",
        frag: "/matrixScale.frag",
        title: title,
        displayName: title ?? "Painting",
        description: "Preview Painting Sketch -" + title,
        transitions: true, 
        inputs: [
            {
                "icon": "zoom_in_map",
                "type": "slider",
                "label": "waves",
                "uniform": "u_waves",
                "settings": {
                    "min": 0,
                    "max": 1000,
                    "step": 1,
                    "value": (title == "fountain") ? 80 : 10
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
                    "value": (title == "grateful_dead") ? 120 : 60
                },
                "description": "Implements zooming into the upper left corner of the canvas. Value controls how long the zoom should run.",
            }
        ],
        textures: [
            { "uniform": "u_texture"},
            // { "uniform": "u_foreground"},
        ],

        noises: [{ blob:"https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/perlin.png"}]
    }

}