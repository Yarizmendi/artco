
"use server"
import connect from 'mongo/index.js'
import ImageModel from '@/mongo/models/image.model.js'
import { del } from '@vercel/blob'
import { revalidatePath } from 'next/cache'

export async function deleteImageAction(formData: FormData) {
    const uploaderId = formData.get("uploaderId") as string
    const vercelBlobUrl = formData.get("vercelBlobUrl") as string
    await connect()
    await del( vercelBlobUrl )
    await ImageModel.findOneAndDelete({ blob: vercelBlobUrl })
    revalidatePath(`/${ uploaderId }/paintings`)
}


