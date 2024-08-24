
"use server"
import connect from 'mongo/index.js'
import ImageModel from '@/mongo/models/image.model.js'
import { del } from '@vercel/blob'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export async function deleteImageAction(formData: FormData) {
    await connect()
    const id = formData.get("imageId")
    const uploaderId = formData.get("uploaderId")
    await ImageModel.findByIdAndDelete({ _id: id }).exec()

    const vercelBlobUrl = formData.get("vercelBlobUrl") as string
    await del( vercelBlobUrl )

    revalidatePath(`/${ uploaderId }/paintings`)
}


