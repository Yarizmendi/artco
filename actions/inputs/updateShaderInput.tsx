
"use server"
import connect from 'mongo/index.js'
import InputModel from '@/mongo/models/input.model.js'

export async function updateShaderAction(motionId) {
    await connect()
    return InputModel.updateOne({ _id: motionId }).exec()
}

