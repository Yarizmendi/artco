
"use server"
import connect from 'mongo/index.js'
import ImageModel from '@/mongo/models/image.model.js'
import { del } from '@vercel/blob'
import { revalidatePath } from 'next/cache'

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


