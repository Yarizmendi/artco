
import Sketch from "../../../../comps/pages/PathSketch"
import { getSketchData } from "actions/sketches"

export default async function Page({ params }) {
  const sketchData = await getSketchData( params.path )
  console.log(sketchData)
  return <Sketch {...sketchData} />
}
