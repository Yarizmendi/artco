

import CreateSketchPage from "../create/page"
import { SketchesList } from "./SketchesList"

export default function Sketches({ params }) {
  return (
    <div className="flex grow m-4 gap-4">
      <CreateSketchPage params={params} />
      <SketchesList creatorId={params.user} />
    </div>
  )
}




