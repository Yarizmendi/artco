
import CreateSketchPage from "../create/page"
import { SketchesList } from "./SketchesList"

export default function Sketches({ params }) {
  return (
    <div className="flex flex-col items-center justify-center grow md:flex-row md:items-start mt-8 px-4">
      <CreateSketchPage params={params} />
      <SketchesList creatorId={params.user} />
    </div>
  )
}




