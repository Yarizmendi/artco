"use server"
import connect from 'mongo/index.js'
import InputModel from '@/mongo/models/input.model.js'

export async function getShaderInputs () {
    await connect()
    return InputModel.find().exec()
}

export async function getShaderInputById (motionId) {
    await connect()
    return InputModel.findOne({ _id: motionId }).exec()
}
