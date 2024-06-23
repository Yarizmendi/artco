
import { colorsSketch as allImages } from "../api/images"
import { Nav } from "../comps/Nav"
import { ArtLinks } from "../comps/ArtLink"

function ArtPage() {
  const links = [
    { path: "/", text: "browse" },
    { path: "/family", text: "family" },
    { path: "/transitions", text: "transitions" },
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
