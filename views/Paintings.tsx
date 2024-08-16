
import ArtLink from "@/comps/Links/ArtLinks"
import { getImages } from "actions/sketchActions"

export default async function Paintings() {
  const images = await getImages().then(s=>s.reverse())
  return (
    <div className="flex items-center grow">
      <div className="h-[480px] flex flex-wrap justify-center overflow-auto">
        {images.map((img, idx) => <ArtLink key={idx} {...img} />)}
      </div>
    </div>
  )
}

