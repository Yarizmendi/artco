
import Sketch from "./Sketch.tsx"
import { getImages } from "@/api/images.ts"

export default function WindowSketch() {
  const imgs = getImages({ sketch: "window" })
  return <Sketch imgs={ imgs } />
}

