
import Sketch from "./Sketch.tsx"
import { getImages } from "@/api/images.ts"

export default function SketchPage() {
  const imgs =  getImages({})
  return <Sketch imgs={ imgs } />
}

