
import Sketch from "@/comps/pages/PathSketch"
import { getShadersBySketch } from "@/api/shaders/shaders"

export default async function Page({ params }) {
  const sketchData = await getShadersBySketch( params.path )
  return <Sketch {...sketchData} />
}
