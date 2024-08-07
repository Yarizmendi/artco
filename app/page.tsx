
import { getImages } from "actions/images"
import ArtLink from "@/comps/Links/ArtLinks"

export default async function Homepage() {
  const images = await getImages()
  return (
    <div className="flex items-center grow">
      <div className="h-[480px] flex flex-wrap justify-center overflow-auto">
        {images.map((img, idx) => <ArtLink key={idx} {...img} />)}
      </div>
    </div>
  )
}





