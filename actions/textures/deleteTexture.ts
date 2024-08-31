

"use server"
import connect from 'mongo/index.js'
import TextureModel from '@/mongo/models/texture.model.js'

export async function deleteTexture ( id ) {
    await connect()
    return TextureModel.findByIdAndDelete({ _id: id }).exec()
}
