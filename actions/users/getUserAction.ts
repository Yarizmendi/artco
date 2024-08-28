
"use server"
import connect from 'mongo/index.js'
import UserModel from '@/mongo/models/user.model.js'
import { redirect } from 'next/navigation'

export async function getUsersAction () {
    await connect()
    return UserModel.find().exec()
}

export async function getUserByUsernameAction( formData: FormData ) {
    const username = formData.get("username")
    await connect()
    const user = await UserModel.findOne({ username }).exec()
    redirect(`/${ user.id }/`)
}
