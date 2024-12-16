
// import { CreateSketchForm } from "@/comps/Forms/CreateSketchForm"
import { SketchesList } from "./SketchesList"

export default function Sketches({ params }) {
  return (
      <SketchesList creatorId={params.user} />
  )
}




