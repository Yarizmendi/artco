
import { IconLink } from "@/comps/Links/IconLink"
import SketchLink from "@/comps/Links/SketchLink"
import { getSKetchesByCreatorId } from "actions/sketches/getSketches"

import { USERID } from "data/id"
// import Link from "next/link"

export default async function Sketches({params}) {
  const creatorId = params.user || USERID
  const showcases = await getSKetchesByCreatorId({ creatorId }).then(s=>s.reverse())
  return (
    <div className="grow">
      <menu className="flex justify-between items-center pt-4 px-8">
        <IconLink href={`/${creatorId}/sketches/create`} />
        <input className="dark:bg-slate-900 border-b dark:border-slate-100 text-sm font-light mr-8" type={"search"} placeholder={"search"} />
      </menu>
      <div className={"h-[400px] m-2 p-2 flex flex-wrap items-center overflow-auto "}>
        { showcases.map(sketch => <SketchLink key={ sketch._id } sketch={sketch} /> )}
      </div>
    </div>
  )
}


