
"use server"
import connect from 'mongo/index.js'
import ImageModel from '@/mongo/models/image.model.js'

export async function updateImageAction( formData: FormData ) {
    const _id = formData.get("id")
    const title = formData.get("title")
    const displayName = formData.get("displayName")
    const description = formData.get("description")
    await connect()
    await ImageModel.findByIdAndUpdate({ _id }, {
        title,
        displayName,
        description
    }).exec()
}