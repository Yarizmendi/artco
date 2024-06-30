
import Sketch from "./Sketch.tsx"
import { getImages } from "@/api/images.ts"

export default function PathSKetch({ params}) {
  const imgName = params.path.split('.')[ 0 ]
  const imgs = getImages({ title: imgName })
  return <Sketch imgs={ imgs } />
}

