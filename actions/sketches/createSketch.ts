
import connect from 'mongo/index.js'
import SketchModel from '@/mongo/models/sketch.model.js'

export async function createSketch ( sketch ) {
    await connect()
    const sketches = SketchModel.create({ sketch })
    return sketches
}