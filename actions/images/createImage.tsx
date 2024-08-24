
"use server"
import connect from 'mongo/index.js'
import ImageModel from '@/mongo/models/image.model'
import { put } from '@vercel/blob'
import { revalidatePath } from 'next/cache'

export async function uploadImageAction(formData: FormData) {
    'use server'
    const imageMongo = {}
    const uploaderId = formData.get("uploaderId")
    const imageFile = formData.get('image') as File
    const description = formData.get('description')

    await put(imageFile.name, imageFile, {
      access: 'public',
      addRandomSuffix: false
    }).then( async blob => {
        const { url, downloadUrl, pathname } = blob
        const imgNoExt = pathname.split('.')[0]
        const imgNoPunct = imgNoExt.replace(/_/g, ' ')
        imageMongo["title"] = imgNoExt
        imageMongo["displayname"] = imgNoPunct
        imageMongo["description"] = description
        imageMongo["uploaderId"] = uploaderId
        imageMongo["blob"] = url
        imageMongo["pathname"] = pathname
        imageMongo["downloadUrl"] = downloadUrl
    })

    await connect()
    await ImageModel.create(imageMongo)
    revalidatePath(`/${ uploaderId }/paintings`)
}