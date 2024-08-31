
"use server"
import connect from 'mongo/index.js'
import TextureModel from '@/mongo/models/texture.model.js'

export async function createTexture(texture) {
    await connect()
    return await TextureModel.create(texture)
}