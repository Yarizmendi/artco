
import Sketch from "./Sketch.tsx"
import { getImages } from "@/api/images.ts"

export default function WaveSketch() {
  const imgs = getImages({ sketch: "waves" })
  return <Sketch imgs={ imgs } />
}

