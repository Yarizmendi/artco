
import Nav from "@/comps/Nav/BaseNav"
import { getImages } from "actions/images"
import ArtLink from "@/comps/Links/ArtLinks"

export default async function ArtPage() {
  const images = await getImages()
  const links = [
    { path: "/sketches/stem", title: "stem" },
    { path: "/sketches/city", title: "city" },
    { path: "/sketches/oceans", title: "oceans" },
  ]
  return (
    <div>
      <Nav links={links} />
      <div className="max-w-[1200px] h-[450px] flex flex-wrap justify-center items-center overflow-auto">
        {images.map((img, idx) => <ArtLink key={idx} {...img} />)}
       </div>
    </div>
  )
}




