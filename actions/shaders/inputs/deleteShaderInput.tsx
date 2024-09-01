
"use server"
import connect from 'mongo/index.js'
import InputModel from '@/mongo/models/input.model.js'

export async function deleteShaderAction(id) {
    await connect()
    await InputModel.findByIdAndDelete({ _id: id }).exec()
}


