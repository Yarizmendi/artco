
"use server"
import connect from 'mongo/index.js'
import SketchModel from '@/mongo/models/sketch.model.js'
import { redirect } from 'next/navigation'
import { USERID } from 'data/id'
import { revalidatePath } from 'next/cache'

export async function deleteSketchAction( id ) {
    await connect()
    await SketchModel.findByIdAndDelete({ _id: id }).exec()
    revalidatePath(`/${USERID}/sketches/`)
    redirect(`/${USERID}/sketches/`)
}