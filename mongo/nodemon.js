
import UserModel from "./models/user.model.js"
import ImageModel from "./models/image.model.js"
import InputModel from "./models/input.model.js"
import TextureModel from "./models/texture.model.js"
import ShaderModel from "./models/shader.model.js"
import SketchModel from "./models/sketch.model.js"

import { list } from "@vercel/blob";
import connect from './db.js'

await connect()

async function getUserById() {
  const sketch = await UserModel.find().exec()
  console.log(sketch)
}

async function getSketchByTitle() {
  const sketch = await SketchModel.findOne().populate("creator").exec()
  console.log(sketch.creator);
}

async function updateSketch(_id="66bdb2564ca6cabf9f8793d1") {
  const sketch = await SketchModel.updateOne({_id},{shaderIds:["66c024d7ee7825718cb087e9"]})
  console.log(sketch);
}

async function createImages() {
  let vercelBlobs = await list({token: process.env.BLOB_READ_WRITE_TOKEN})
  vercelBlobs = vercelBlobs.blobs
  vercelBlobs.map( async blob => {
    const { url, downloadUrl, pathname, size, uploadedAt } = blob
    const image = {}
    const imgNoExt = pathname.split('.')[0]
    const imgNoPunct = imgNoExt.replace(/_/g, ' ')
    image["title"] = imgNoExt
    image["displayname"] = imgNoPunct
    image["uploaderId"] = "66bd62276d3999b70d5fd91b"
    image["blob"] = url
    image["size"] = size
    image["pathname"] = pathname
    image["uploadedAt"] = uploadedAt
    image["downloadUrl"] = downloadUrl
    const sketch = await ImageModel.create({...image})
    console.log(sketch)
  })

}

async function createInputs() {

  const inputs =  

  {  
    icon: "heat",
    type: "slider",
    label: "waves",
    uniform: "u_waves",
    description: "amplitude of trig function",
    settings: { min: 0, max: 100, value: 30, step: 1 },
  }

  const input = await InputModel.create({...inputs})
  console.log(input)
}

async function createTextures() {

  const tex =  

  {  
    type: "texture",
    uniform: "u_texture",
  }

  const texture = await TextureModel.create(tex)
  console.log(texture)
}

async function createShaders() {

  const shaderInput =  

  {  
    title: "Waves Shader",
    icon: "heat",
    description: "Ocean Motion",
    inputIds: ["66c0231a26fb9c0fdb5b1f71"],
    textureIds: ["66c023dd5b84addbc1675f72"],
  }

  const shader = await ShaderModel.create(shaderInput)
  console.log(shader)
}

async function addSchemaField() {
  const schema = await SketchModel.updateOne(
    {title:"oceans"},
    { $set: { "inputs": [
      {  
      icon: "heat",
      type: "slider",
      label: "waves",
      uniform: "u_waves",
      description: "amplitude of trig function",
      settings: { min: 0, max: 100, value: 30, step: 1 },
    },
    {  
      icon: "zoom_in_map",
      type: "slider",
      label: "zoom",
      uniform: "u_zoom",
      description: "amplitude of trig function",
      settings: { min: 0, max: 120, value: 120, step: 1 },
    }
  ] } },
  )
  console.log(schema)
}

async function RenameSchemaField() {
  const sketch = await SketchModel.updateOne(
    {title:"oceans"},
    { $rename: { "shaderIds": "textures" }},
  )
  console.log(sketch)
}





// addSchemaField()



