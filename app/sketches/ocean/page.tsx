
import Sketch  from "./Sketch.tsx"
import { getImages } from "@/api/images"
import { getSketchImgs } from "actions/blobs.ts"

export default function OceanSketch() {
  const filenames: string[] = getImages({ sketch: "ocean" })
  const filepaths = getSketchImgs({ paths: filenames })
  return <Sketch imgs={ filepaths }/>
}


