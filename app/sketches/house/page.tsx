
import Sketch from "./Sketch.tsx"
import { getImages } from "@/api/images"

export default function HouseSketch() {
  const imgs = getImages({ sketch: "house" })
  return <Sketch imgs={ imgs }/>
}

