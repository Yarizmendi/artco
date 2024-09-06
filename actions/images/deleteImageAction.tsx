
"use server"
import connect from 'mongo/index.js'
import ImageModel from '@/mongo/models/image.model.js'
import { del } from '@vercel/blob'
import { revalidatePath } from 'next/cache'
import CollectionModel from '@/mongo/models/collections.model'

export async function deleteImageAction( id, blob, uploaderId ) {
    await connect()
    await ImageModel.findByIdAndDelete(id)

    try {
      await del( blob )
    }
    catch {
        console.log("already deleted")
    }
    
    revalidatePath(`/${ uploaderId }/paintings`)
}

export async function deleteCollectionAction({ id, uploaderId, images }) {
  await connect()
  await ImageModel.deleteMany({ collectionId: id })

  for (let i=0; i<images.length; i++) {
    const blob = images[i].blob
    try {
      await del(blob)
    }
    catch {
      console.log("already deleted")
    }
  }

  await CollectionModel.findByIdAndDelete(id)
  revalidatePath(`/${ uploaderId }/collections`)
  revalidatePath(`/${ uploaderId }/paintings`)
}


