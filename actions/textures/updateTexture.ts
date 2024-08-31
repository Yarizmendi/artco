
"use server"
import connect from 'mongo/index.js'
import TextureModel from '@/mongo/models/texture.model.js'

export async function updateTexture( id ) {
    await connect()
    return TextureModel.updateOne({ _id: id }).exec()
}

