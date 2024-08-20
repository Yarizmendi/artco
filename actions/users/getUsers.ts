
import connect from 'mongo/index.js'
import UserModel from '@/mongo/models/user.model.js'

export async function getUsers () {
    await connect()
    const users = UserModel.find()
    // const users = await UserModel.find().exec()
    // const users = await UserModel.find().exec()
    // console.log(inpts)
    return users
}

// export const getUsers = async () => UserModel.find().exec()

