
"use server"
import connect from 'mongo/index.js'
import ImageModel from '@/mongo/models/image.model'

export async function getMongoImagesByUploaderId ({ uploaderId }) {
    await connect()
    return ImageModel.find({ uploaderId }).select("-uploaderId -__v").sort({ createdAt: "desc"}).exec()
}

export async function getMongoImageById (imageId) {
    await connect()
    return ImageModel.findOne({ _id: imageId }).select("-uploaderId -__v").exec()
}

export async function getMongoImageByTitle (title) {
    await connect()
    return ImageModel.findOne({ title }).select("-uploaderId -__v").exec()
}

export async function getMongoImageByBlob (blob) {
    await connect()
    return ImageModel.findOne({ blob: blob }).select("-uploaderId -__v").exec()
}

export async function getMongoImages () {
    await connect()
    return ImageModel.find().select("-uploaderId -__v").exec()
}

 