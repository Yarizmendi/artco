
// import { CreateSketchForm } from "@/comps/Forms/CreateSketchForm"
import { SketchesList } from "./SketchesList"

export default function Sketches({ params }) {
  return (
    // <div className="h-full w-full flex flex-col items-center justify-center md:flex-row md:items-start m-2 p-2 gap-2">
      <SketchesList creatorId={params.user} />

  )
}




