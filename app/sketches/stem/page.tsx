
import Sketch from "./Sketch.tsx"
import { getImages } from "@/api/images"
import { getBlobs, getSketchImgs } from "actions/blobs.ts"

export default function StemSketch() {
  const filenames: string[] = getImages({ sketch: "stem" })
  const filepaths = getSketchImgs({ paths: filenames })
  const noises = getBlobs({ prefix: "perlin.png", limit: 1 })
  return <Sketch imgs={ filepaths } noises={ noises } />
}




