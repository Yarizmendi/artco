
'use server' // Mutate data and revalidate cache

import connect from 'mongo/index.js'
import ShaderModel from '@/mongo/models/shader.model.js'
import UserModel from '@/mongo/models/user.model.js'
import ImageModel from '@/mongo/models/image.model.js'
import SketchModel from '@/mongo/models/sketch.model.js'
import TextureModel from '@/mongo/models/texture.model.js'
import InputModel from '@/mongo/models/input.model.js'

export const getTexturesById = async (id) => TextureModel.find().exec()
// export const getInputs = async () => await InputModel.find().exec()

export async function getInputs () {
    await connect()
    const inpts = await InputModel.find().exec()
    // console.log(inpts)
    return inpts
}

export const createUser = async user => UserModel.create({ user })
export const getUsers = async () => UserModel.find().exec()
export const getUser = async (usernme) => UserModel.findOne({username:"Benji"}).exec()

export const getShaders = async ({_id}) => ShaderModel.findOne({_id}).exec()

// export const createSketch = async sketch => SketchModel.create({ sketch })

export const createSketch = async sketch => await SketchModel.create({sketch})
export const updateSketch = async (_id, sketch) => SketchModel.updateOne({_id}, sketch)
export const getSKetches = async () => SketchModel.find().exec()
export const getSKetch = async ( title ) => SketchModel.findOne({ title }).exec()
export const getSketchesByCreatorId = async ({ creatorId }) => SketchModel.find({ creatorId }).exec()

export const createImage = async img => ImageModel.create({ img })
export const getImages = async () => ImageModel.find().exec()
export const getImageById = async ({id}) => ImageModel.findOne({id}).exec()
export const getImagesByCreatorId = async ({ uploaderId }) => ImageModel.find({ uploaderId }).exec()
