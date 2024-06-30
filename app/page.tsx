
import { allImages } from "./api/images"
import Nav from "./comps/Nav"
import ArtLinks from "./comps/ArtLinks"

function ArtPage() {
  const links = [
    { path: "/sketches/stem", text: "stem" },
    { path: "/sketches/ocean", text: "ocean" },
    { path: "/sketches/house", text: "house" },
    { path: "/sketches/waves", text: "waves" },
    { path: "/sketches/window", text: "window" },
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
