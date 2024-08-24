
import connect from 'mongo/index.js'
import SketchModel from '@/mongo/models/sketch.model.js'

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
    const sketches = SketchModel.findOne({ title: sketchTitle }).exec()
    return sketches
}

export async function getSketchById (id) {
    await connect()
    const sketches = SketchModel.findOne({ _id: id }).exec()
    return sketches
}