
import Sketch from "./Sketch.tsx"
import { getImages, getNoises } from "@/api/images"

export default function StemSketch() {
  const imgs = getImages({ sketch: "stem" })
  const noises = getNoises({ title: "perlin" })
  return <Sketch imgs={ imgs } noises={ noises } />
}

