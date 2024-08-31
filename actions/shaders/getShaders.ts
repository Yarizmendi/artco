

"use server"
import connect from 'mongo/index.js'
import ShaderModel from '@/mongo/models/shader.model'

export async function getAllShaders() {
    await connect()
    return ShaderModel.find().populate(["inputIds", "textureIds"]).exec()
}