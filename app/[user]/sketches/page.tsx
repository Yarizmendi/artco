
import { CreateSketchForm } from "@/comps/Forms/CreateSketchForm"
import { SketchesList } from "./SketchesList"

export default function Sketches({ params }) {
  return (
    <div className="flex flex-col items-center justify-center grow md:flex-row md:items-start p-4 gap-4">
      <CreateSketchForm user={params.user} /> 
      <SketchesList creatorId={params.user} />
    </div>
  )
}




