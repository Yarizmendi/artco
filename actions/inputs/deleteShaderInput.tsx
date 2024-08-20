
"use server"
import connect from 'mongo/index.js'
import InputModel from '@/mongo/models/input.model.js'
import { redirect } from 'next/navigation'

export async function deleteShaderAction(id) {
    await connect()
    await InputModel.findByIdAndDelete({ _id: id }).exec()
    redirect("/motions")
}


