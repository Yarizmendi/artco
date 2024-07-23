
import Sketch from "./Sketch.tsx"
import { getImages } from "actions/blobs.ts"

export default async function Page({ params }) {
  const images = await getImages({ prefix: params.path, limit: 1 })
  return <Sketch imgs={ images.blobs } />
}
