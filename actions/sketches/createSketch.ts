
// export const createSketch = async sketch => await SketchModel.create({sketch})

import connect from 'mongo/index.js'
import SketchModel from '@/mongo/models/sketch.model.js'

export async function createVercelBLobs( urls ) {
    const vercelBaseUrl = "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com"

}

export async function createSketch ( sketch ) {
    await connect()
    const sketches = SketchModel.create({ sketch })
    return sketches
}