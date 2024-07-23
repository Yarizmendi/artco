
import Nav from "@/comps/Nav"
import ArtLink from "@/comps/ArtLinks"
import { getBlobs } from "actions/blobs"

export default function ArtPage() {
  const links = [
    { path: "/sketches/stem", text: "stem" },
    { path: "/sketches/ocean", text: "ocean" },
    { path: "/sketches/house", text: "house" },
    { path: "/sketches/waves", text: "waves" },
    { path: "/sketches/window", text: "window" },
  ]

  return (
    <>
      <Nav links={ links } />
        <ArtLinks />
    </>
  )
}

async function ArtLinks() {
  const blobs = await getBlobs({ limit: 15 })
  return (
    <div className="mb-[10px] max-w-[1200px] h-[350px] m-auto flex flex-wrap justify-center items-center overflow-auto">
      { blobs!.map(( blob, idx ) => <ArtLink key={ idx } url={ blob.url } /> )}
    </div>
  )
}

