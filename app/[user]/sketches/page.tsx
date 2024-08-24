
import { IconLink } from "@/comps/Links/IconLink"
import SketchLink from "@/comps/Links/SketchLink"
import { SectionSkeleton } from "@/comps/Loading/SectionSkeleton"
import { getSKetchesByCreatorId } from "actions/sketches/getSketches"
import { USERID } from "data/id"
import { Suspense } from "react"

export default function Sketches({ params }) {
  const creatorId = params.user || USERID
  return (
    <div className="grow">
      <menu className="flex items-center justify-end p-4 px-4 gap-4">
        <IconLink href={`/${creatorId}/sketches/create`} />
        <input className="dark:bg-slate-900 border-b dark:border-slate-100 text-sm font-light mr-8 w-[300px] p-1" type={"search"} placeholder={"Search"} />
      </menu>
      <Suspense fallback={<SectionSkeleton/>}>
        <SketchesSuspense creatorId={creatorId}/>
      </Suspense>
    </div>
  )
}

async function SketchesSuspense({ creatorId }) {
  const showcases = await getSKetchesByCreatorId({ creatorId }).then(s=>s.reverse())
  return (
    <div className={"h-[400px] m-2 p-2 flex flex-wrap items-center overflow-auto"}>
    { showcases.map(sketch => <SketchLink key={ sketch._id } sketch={sketch} /> )}
  </div>
  )
}


