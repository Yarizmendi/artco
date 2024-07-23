
import Sketch from "./Sketch.tsx"
import { getImages } from "@/api/images"
import { getBlobCollection } from "actions/blobs.ts"

export default async function HouseSketch() {
  const collection = await getImages({ sketch: "house" })
  const filepaths = await getBlobCollection({collection })
  return <Sketch imgs={ filepaths } title={ "house" } />
}

