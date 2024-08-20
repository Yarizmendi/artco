
import connect from 'mongo/index.js'
import UserModel from '@/mongo/models/user.model.js'

export async function getUsers () {
    await connect()
    const users = UserModel.find().exec()
    return users
}
