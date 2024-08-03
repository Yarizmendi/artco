
import Sketch from "app/collections/sketches/Sketch"
import { getSketchData } from "actions/sketches"

export default async function Page({ params }) {
  const sketchData = await getSketchData( params.path )
  return <Sketch {...sketchData} />
}
