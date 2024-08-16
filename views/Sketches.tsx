
import SketchLink from "@/comps/Links/SketchLink"
import { getSketchesByCreatorId } from "actions/sketchActions"

export default async function Sketches({params}) {
  const creator = params.user || "66bd62276d3999b70d5fd91b"
  const showcases = await getSketchesByCreatorId({ creator }).then(s=>s.reverse())
  return (
    <div className="flex grow justify-center items-center">
      <div className={"h-[500px] w-10-12 m-4 flex flex-wrap items-center overflow-auto "}>
        { showcases.map(sketch => <SketchLink key={ sketch._id } sketch={sketch} /> )}
      </div>
    </div>
  )
}


