
"use server"
import connect from 'mongo/index.js'
import SketchModel from '@/mongo/models/sketch.model.js'

export async function updateSketchAction( formData: FormData ) {
    const _id = formData.get("id")
    const title = formData.get("title")
    const displayName = formData.get("displayName")
    const description = formData.get("description")
    await connect()
    await SketchModel.findByIdAndUpdate({ _id }, { title, displayName, description }).exec()
}