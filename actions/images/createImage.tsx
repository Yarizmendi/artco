
"use server"
import connect from 'mongo/index.js'
import ImageModel from '@/mongo/models/image.model'
import { put } from '@vercel/blob'

export async function uploadImageAction(formData: FormData) {
    const imageMongo = {}
    const uploaderId = formData.get("uploaderId")
    const imageFile = formData.get('image') as File
    const description = formData.get('description')
    const displayName = formData.get('displayName')
    const title = formData.get('title')

    await put(imageFile.name, imageFile, {
      access: 'public',
      addRandomSuffix: false
    }).then( blob => {
        const { url, downloadUrl, pathname } = blob
        imageMongo["title"] = title
        imageMongo["displayname"] = displayName
        imageMongo["description"] = description
        imageMongo["uploaderId"] = uploaderId
        imageMongo["blob"] = url
        imageMongo["pathname"] = pathname
        imageMongo["downloadUrl"] = downloadUrl
    })
    await connect()
    await ImageModel.create(imageMongo)
}