
import { colorsSketch as allImages } from "./api/images"
import Nav from "./comps/Nav"
import ArtLinks from "./comps/ArtLinks"

function ArtPage() {
  const links = [
    { path: "/", text: "browse" },
    { path: "/sketches/stem", text: "stem" },
    { path: "/sketches/ocean", text: "ocean" },
    { path: "/sketches/sunset", text: "sunset" },
  ]
  
  return (
    <div className="w-full">
      <Nav links={ links } />
      <ArtLinks 
        links = { allImages }
        width={ 150 } 
        height={ 160 } /> 
    </div>
  )
}

export default ArtPage
