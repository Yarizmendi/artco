
"use server"
import connect from 'mongo/index.js'
import ImageModel from '@/mongo/models/image.model'
import { put } from '@vercel/blob'
import CollectionsModel from '@/mongo/models/collections.model'
import { mongo } from 'mongoose'

export async function uploadImageAction(formData: FormData, selection: any) {
    const imageMongo = {}
    const imageMongoIds = []
    let collectionBlob: string
    let createdCollectionId: any

    const title = formData.get('title')
    const uploaderId = formData.get("uploaderId")
    const description = formData.get('description')
    const displayName = formData.get('displayName')
    const isCollection = formData.get('isCollection')

    let imageFiles = formData.getAll('image')
    imageFiles = Array.from(imageFiles)
    console.log(selection)

    let mongoImages = []

    await connect()

    if (isCollection == "1") {

      for (let i=0; i<selection.length; i++) {
        const imageId = selection[i].id
        const image = await ImageModel.findById(imageId)
        console.log(image)
        mongoImages.push(image)
        imageMongoIds.push(image._id)
        console.log(imageMongoIds, mongoImages)
      }

      const { url, downloadUrl, pathname } = mongoImages[0]

      createdCollectionId = await CollectionsModel.create({
        uploaderId,
        images: [...imageMongoIds],
        blob: mongoImages[0].blob, 
        title: mongoImages[0].title + " collection",
        description: description,
        displayName: "new collection",
      })

      console.log(createdCollectionId)
    }

    else {
      for (let i=0; i<imageFiles.length; i++) {
        const imageFile = imageFiles[i]
        // @ts-ignore
        await put(imageFile.name, imageFile, {
          access: 'public',
          addRandomSuffix: false
        }).then( blob => {
            const { url, downloadUrl, pathname } = blob
            imageMongo["title"] = isCollection ? pathname : (title || pathname)
            imageMongo["displayname"] = displayName
            imageMongo["description"] = description
            imageMongo["uploaderId"] = uploaderId
            imageMongo["blob"] = url
            imageMongo["pathname"] = pathname
            imageMongo["downloadUrl"] = downloadUrl
  
            // if (isCollection=="1") {
            //   imageMongo["collectionId"] = createdCollectionId._id
            //   if (i==0) collectionBlob = url
            // }
  
      })
      const imageId = await ImageModel.create(imageMongo)
      imageMongoIds.push(imageId)
      }
    }

    // if (isCollection == "1") await CollectionsModel.findByIdAndUpdate({ _id: createdCollectionId._id }, { images: selection, blob: collectionBlob })

}