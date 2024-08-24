
"use server"
import connect from 'mongo/index.js'
import TextureModel from '@/mongo/models/texture.model.js'

export async function getShaderTextures () {
    await connect()
    return TextureModel.find().exec()
}

export async function getShaderTextureById (texId) {
    await connect()
    return TextureModel.findOne({ _id: texId }).exec()
}
