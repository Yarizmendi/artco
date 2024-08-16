
import UserModel from '@/mongo/models/usermodel'
import ImageModel from '@/mongo/models/image.model'
import SketchModel from '@/mongo/models/sketchmodel'

const addUser = async user => {
    const title = user.get('name')
    const newUser = new UserModel({ title })
    return newUser.save()
}

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

const getSketchesByCreatorId = async ({ creatorId }) => {
    return SketchModel.find({ creatorId }).exec()
}

const getImagesByCreatorId = async ({ creatorId }) => {
    return ImageModel.find({ creatorId }).exec()
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