
"use server"
import connect from 'mongo/index.js'
import ImageModel from '@/mongo/models/image.model'
import { put } from '@vercel/blob'

export async function uploadImageAction(formData: FormData) {
    const imageMongo = {}
    const uploaderId = formData.get("uploaderId")

    let imageFiles = formData.getAll('image')
    imageFiles = Array.from(imageFiles)

    const description = formData.get('description')
    const displayName = formData.get('displayName')
    const title = formData.get('title')

    for (let i=0; i<imageFiles.length; i++) {
      const imageFile = imageFiles[i]

// @ts-ignore
    await put(imageFile.name, imageFile, {
      access: 'public',
      addRandomSuffix: false
    }).then( blob => {
        const { url, downloadUrl, pathname } = blob
        imageMongo["title"] = title || blob.pathname
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

}