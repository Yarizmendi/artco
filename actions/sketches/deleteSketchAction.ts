
"use server"
import connect from 'mongo/index.js'
import SketchModel from '@/mongo/models/sketch.model.js'

export async function deleteSketchAction( id ) {
    await connect()
    await SketchModel.findByIdAndDelete(id).exec()
}