
"use server"
import connect from 'mongo/index.js'
import SketchModel from '@/mongo/models/sketch.model.js'
import { redirect } from 'next/navigation'
import { USERID } from 'data/id'
import { revalidatePath } from 'next/cache'

export async function updateSketchAction( id, updateBody ) {
    await connect()
    await SketchModel.findByIdAndUpdate({ _id: id }, { updateBody }).exec()
    revalidatePath(`/${USERID}/sketches/`)
    redirect(`/${USERID}/sketches/`)
}