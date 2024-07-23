
import Sketch from "./Sketch.tsx"
import { getBlob } from "actions/blobs.ts"
import { stripFileExtension, stripNextPathParams } from "actions/utils.ts"

export default async function Page({ params }) {
  const prefix = stripNextPathParams( params.path )
  const sketchName = stripFileExtension( params.path )
  const images = await getBlob({ prefix })
  return <Sketch imgs={ images } sketchName={ sketchName } />
}
