
import Nav from "@/comps/Nav"
import ArtLinks from "@/comps/ArtLinks"
import { getImages } from "@/api/images"

function ArtPage() {
  const links = [
    { path: "/sketches/stem", text: "stem" },
    { path: "/sketches/ocean", text: "ocean" },
    { path: "/sketches/house", text: "house" },
    { path: "/sketches/waves", text: "waves" },
    { path: "/sketches/window", text: "window" },
  ]

  const allImages = getImages({ sketch: "all" })
  
  return (
    <div className="w-full">
      <Nav links={ links } />
      {
        allImages && <ArtLinks 
          links = { allImages }
          width={ 150 } 
          height={ 160 } /> 
      }

    </div>
  )
}

export default ArtPage
