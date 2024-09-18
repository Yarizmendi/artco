
import { CreateSketchForm } from "@/comps/Forms/CreateSketchForm"
import { SketchesList } from "./SketchesList"

export default function Sketches({ params }) {
  return (
    <div className="flex flex-col grow md:flex-row justify-start items-center gap-12 m-4">
      <CreateSketchForm user={params.user} /> 
      <SketchesList creatorId={params.user} />
    </div>
  )
}




