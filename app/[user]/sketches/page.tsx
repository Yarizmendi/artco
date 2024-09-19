
import { CreateSketchForm } from "@/comps/Forms/CreateSketchForm"
import { SketchesList } from "./SketchesList"

export default function Sketches({ params }) {
  return (
    <div className="flex flex-col items-center justify-center grow md:flex-row md:items-start m-4 p-4">
      <CreateSketchForm user={params.user} /> 
      <div className={"flex flex-col mx-4 w-11/12 md:w-2/3 mx-8"}>
        <SketchesList creatorId={params.user} />
      </div>
    </div>
  )
}




