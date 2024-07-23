
import Sketch  from "./Sketch.tsx"
import { getImages } from "@/api/images"
import { getBlobCollection } from "actions/blobs.ts"

export default async function WavesSketch() {
  const collection: string[] = await getImages({ sketch: "waves" })
  const filepaths = await getBlobCollection({ collection })
  return <Sketch imgs={ filepaths } title={"waves"} />
}
