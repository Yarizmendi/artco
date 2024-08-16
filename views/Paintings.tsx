

import { Painting } from "@/comps/Links/PaintingLink"
import { getImagesByCreatorId } from "actions/sketchActions"

export default async function Paintings({params}) {
  const uploaderId = params.user || "66bd62276d3999b70d5fd91b"
  const images = await getImagesByCreatorId({ uploaderId }).then(s=>s.reverse())
  return (
    <div className="flex items-center grow">
      <div className="h-[480px] flex flex-wrap justify-center overflow-auto">
        {images.map( art => <Painting key={art._id} title={art.title} blob={art.blob} path={art.pathname} id={uploaderId}  />)}
      </div>
    </div>
  )
}

