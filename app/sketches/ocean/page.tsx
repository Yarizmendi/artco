
import Sketch  from "./Sketch.tsx"
import { getImages } from "@/api/images"

export default function OceanSketch() {
  const imgs = getImages({ sketch: "ocean" })
  return <Sketch imgs={ imgs }/>
}
