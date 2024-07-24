
import Sketch from "./Sketch.tsx"
import { getBlob } from "actions/blobs.ts"
import { stripFileExtension, stripNextPathParams } from "actions/utils.ts"

export default async function Page({ params, children }) {
  const prefix = stripNextPathParams( params.path )
  const title = stripFileExtension( params.path )
  const images = await getBlob({ prefix })
  return ( 
    <Sketch 
      imgs={ images } 
      title={ title }>
    </Sketch>
  )
}
