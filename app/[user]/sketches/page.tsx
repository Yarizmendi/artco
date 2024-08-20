
import { IconLink } from "@/comps/Links/IconLink"
import SketchLink from "@/comps/Links/SketchLink"
import { getSketchesByCreatorId } from "actions/sketchActions"
import { USERID } from "data/id"

export default async function Sketches({params}) {
  const creatorId = params.user || USERID
  const showcases = await getSketchesByCreatorId({ creatorId }).then(s=>s.reverse())
  return (
    <div className="grow">
      <h1 className="text-xl m-8">Generative Art</h1>
      <div className="flex justify-between py-2 px-8">
        <IconLink href={"/"} />
        <input className="dark:bg-slate-900 border-b dark:border-slate-100 text-sm font-light mr-8" type={"search"} placeholder={"search"} />
      </div>
      <div className={"h-[400px] w-10-12 m-4 flex flex-wrap items-center overflow-auto "}>
        { showcases.map(sketch => <SketchLink key={ sketch._id } sketch={sketch} /> )}
      </div>
    </div>
  )
}


