
import Nav from "@/comps/Nav/BaseNav"
import ArtLink from "@/comps/Links/ArtLinks"
import { getImageData } from "actions/images"

export default function ArtPage() {
  const links = [
    { path: "/sketches/stem", text: "stem" },
    { path: "/sketches/ocean", text: "ocean" },
    { path: "/sketches/house", text: "house" },
    { path: "/sketches/waves", text: "waves" },
  ]

  return (
    <>
      <Nav links={ links } />
      <ArtLinks />
    </>
  )
}

async function ArtLinks() {
  const { imageKeys, imagePaths } = await getImageData()
  return (
    <div className="mb-[10px] max-w-[1200px] h-[450px] m-auto flex flex-wrap justify-center items-center overflow-auto">
      { imageKeys.map(( key, idx ) => <ArtLink title={key} url={ imagePaths[idx]["path"] } /> )}
    </div>
  )
}

