
import Sketch from "./Sketch.tsx"
import { getImages } from "@/api/images"
import { getBlob, getBlobCollection } from "actions/blobs.ts"

export default async function StemSketch() {
  const collection = await getImages({ sketch: "stem" })
  const filepaths = await getBlobCollection({ collection })
  const noises = await getBlob({ prefix: "perlin.png" })
  return <Sketch imgs={ filepaths } noises={ noises } title={"stem"} />
}




