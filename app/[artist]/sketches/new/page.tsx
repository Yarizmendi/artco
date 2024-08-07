
import Sketch from "./Sketch"
import { getSketchData } from "actions/sketches"

export default async function Page({ params }) {
  const sketchData = await getSketchData( "new" )
  return <Sketch {...sketchData} />
}
