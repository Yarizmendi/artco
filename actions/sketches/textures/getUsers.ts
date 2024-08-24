
import connect from 'mongo/index.js'
import TextureModel from '@/mongo/models/texture.model.js'

export async function getTextures () {
    await connect()
    const textures = TextureModel.find().exec()
    return textures
}
