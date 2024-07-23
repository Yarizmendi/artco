
import Sketch  from "./Sketch.tsx"
import { getImages } from "@/api/images"
import { getBlobCollection } from "actions/blobs.ts"

export default async function OceanSketch() {
  const collection = await getImages({ sketch: "ocean" })
  const filepaths = await getBlobCollection({ collection })
  return <Sketch imgs={ filepaths } title={ "ocean" } />
}


