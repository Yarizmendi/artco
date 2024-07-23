
import Sketch  from "./Sketch.tsx"
import { getImages } from "@/api/images"
import { getBlobCollection } from "actions/blobs.ts"

export default async function WindowSketch() {
  const collection: string[] = await getImages({ sketch: "window" })
  const filepaths = getBlobCollection({ collection })
  return <Sketch imgs={ filepaths } title={ "window" } />
}
