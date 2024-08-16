
import UserModel from '@/mongo/models/usermodel'
import ImageModel from '@/mongo/models/image.model'
import SketchModel from '@/mongo/models/sketchmodel'

const addUser = async user => {
    const title = user.get('name')
    const newUser = new UserModel({ title })
    return newUser.save()
}

export const getUsers = async () => UserModel.find().exec()
export const getUser = async ({user}) => UserModel.findOne({user}).exec()


const addSketch = async sketch => {
    const title = sketch.get('title')
    const description = sketch.get('description')
    const newPost = new SketchModel({ title, description })
    return newPost.save()
}

async function updateSketch(title="aqua") {
  const sketch = SketchModel.findOne({title}).projection({ title })
  console.log(sketch);
}
  
const getSKetch = async ( title ) => {
    return SketchModel.findOne({ title }).populate("creator").exec()
}

const getSketchesByCreatorId = async ({ creator }) => {
    return SketchModel.find({ creator }).exec()
}

const getImagesByCreatorId = async ({ uploaderId }) => {
    return ImageModel.find({ uploaderId }).exec()
}


const getSKetches = async () => {
    return SketchModel.find().exec()
}

const getImages = async () => {
    return ImageModel.find().exec()
}


export { 
    getSKetch,
    getSKetches,
    getSketchesByCreatorId,
    getImagesByCreatorId,
    getImages,
 }