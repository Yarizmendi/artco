
import connect from 'mongo/index.js'
import InputModel from '@/mongo/models/input.model.js'

export async function getShaderInputs () {
    await connect()
    const inputs = InputModel.find().exec()
    return inputs
}
