
"use server"
import connect from 'mongo/index.js'
import ImageModel from '@/mongo/models/image.model.js'
import CollectionModel from '@/mongo/models/collections.model'

export async function updateImageAction( formData: FormData ) {
    const _id = formData.get("id")
    const title = formData.get("title")
    const displayName = formData.get("displayName")
    const description = formData.get("description")
    const positionIdx = formData.get("positionIdx")
    const type = formData.get("type")

    await connect()
    await ImageModel.findByIdAndUpdate({ _id }, {
        title,
        displayName,
        description, 
        positionIdx,
        type
    }).exec()
}

export async function updateCollectionAction( formData: FormData ) {
    const _id = formData.get("id")
    const title = formData.get("title")
    const blob = formData.get("blob")
    const images = formData.get("images")
    const displayName = formData.get("displayName")
    const description = formData.get("description")
    
    await connect()
    await CollectionModel.findByIdAndUpdate({ _id }, {
        blob,
        title,
        images,
        description,
        displayName,
    }).exec()
}