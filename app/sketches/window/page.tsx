
import Sketch  from "./Sketch.tsx"
import { getImages } from "@/api/images"
import { getSketchImgs } from "actions/blobs.ts"

export default function WindowSketch() {
  const filenames: string[] = getImages({ sketch: "window" })
  const filepaths = getSketchImgs({ paths: filenames })
  return <Sketch imgs={ filepaths }/>
}
