
"use server"
let bcrypt = require('bcryptjs')
import connect from 'mongo/index.js'
import {redirect} from 'next/navigation'
import UserModel from '@/mongo/models/user.model.js'

export async function getUsersAction () {
    await connect()
    return UserModel.find().exec()
}

export async function createUserAction(formData: FormData) {
    await connect()
    const username = formData.get("username")
    const password = formData.get("password")
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, salt)
    await UserModel.create({ username, password: hashedPassword })
    const createdUser = await UserModel.findOne({username}).exec()
    redirect(`/${createdUser.id}/`)
}
 
export async function loginUserAction(formData: FormData) {
    await connect()
    const username = formData.get("username")
    const password = formData.get("password")
    const user = await UserModel.findOne({username}).exec()
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, salt)
    if (bcrypt.compareSync(password, hashedPassword)) redirect(`/${user.id}/`)
}
