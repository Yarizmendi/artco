import { getImages } from "app/api/images/images"
import ArtLink from "@/comps/Links/ArtLinks"

const images = await getImages()

export default function Home() {
  return (
    <div className="flex items-center grow">
      <div className="h-[480px] flex flex-wrap justify-center overflow-auto">
        {images.map((img, idx) => <ArtLink key={idx} {...img} />)}
      </div>
    </div>
  )
}

