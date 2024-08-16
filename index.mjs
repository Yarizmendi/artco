

import ImageModel from "./mongo/models/image.model.js"
import SketchModel from "./mongo/models/sketchmodel.js"
import { list } from "@vercel/blob";
import connect from './mongo/index.js'

await connect()

async function getSketchByTitle() {
  const sketch = await SketchModel.findOne().populate("creator").exec()
  console.log(sketch.creator);
}

async function updateSketch(title="aqua") {
  const sketch = await SketchModel.findOne({title:"aqua"}).projection({ title })
  console.log(sketch);
}

async function createImages() {
  let vercelBlobs = await list({token:"vercel_blob_rw_qfyy9q32bNwxmAlI_bRLzsLIQ017p7pZdpHvbu1pyaHDjMs"})
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

// createImages()



