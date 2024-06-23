
import { colorsSketch as allImages } from "./api/images"
import Nav from "./comps/Nav"
import ArtLinks from "./comps/ArtLinks"

function ArtPage() {
  const links = [
    { path: "/", text: "browse" },
    { path: "/sketches", text: "sketches" },
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
