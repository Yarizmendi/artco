
"use server"
import connect from 'mongo/index.js'
import ImageModel from '@/mongo/models/image.model'
import CollectionsModel from '@/mongo/models/collections.model'

export async function getCollections () {
    await connect()
    return CollectionsModel.find().populate("images").sort({ createdAt: "desc"}).select("-uploaderId -__v").exec()
}

export async function getUserImgCollections ({ uploaderId }) {
    await connect()
    return CollectionsModel.find({ uploaderId }).populate("images").sort({ createdAt: "desc"}).select("-uploaderId -__v").exec()
}

export async function getUserImgCollectionById (id ) {
    await connect()
    const data = await CollectionsModel.findById(id).populate("images", "-_id -collectionId -uploaderId -__v").limit(2).exec()
    return data.toObject()
}

export async function getMongoImagesByUploaderId ({ uploaderId }) {
    await connect()
    return ImageModel.find({ uploaderId }).select("-uploaderId -__v").sort({ createdAt: "desc"}).exec()
}

export async function getMongoImageById(imageId) {
    await connect()
    return ImageModel.findOne({ _id: imageId }).select("-_id -uploaderId -__v").exec()
}

export async function getMongoImageByTitle(title) {
    await connect()
    return ImageModel.findOne({ title }).select("-_id -uploaderId -__v").exec()
}

export async function getMongoImageByBlob(blob) {
    await connect()
    return ImageModel.findOne({ blob: blob }).select("-_id -uploaderId -__v").exec()
}

export async function getMongoImages() {
    await connect()
    return ImageModel.find().select("-uploaderId -__v").exec()
}

export async function updateMongoImageBlobs() {
    await connect()
    const allMongoImages = await ImageModel.find().select("-_id -uploaderId -__v").exec()
    console.log(allMongoImages)
    return allMongoImages
}

 