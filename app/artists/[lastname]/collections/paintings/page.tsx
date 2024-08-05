
import { getImages } from "actions/images"
import ArtLink from "@/comps/Links/ArtLinks"

export default async function Page() {
  const images = await getImages()
  return (
    <div className="max-w-[1200px] h-[450px] flex flex-wrap justify-center items-center overflow-auto">
      {images.map((img, idx) => <ArtLink key={idx} {...img} />)}
    </div>
  )
}

export { Homepage }




