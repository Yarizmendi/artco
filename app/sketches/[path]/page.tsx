
import Sketch from "./Sketch.tsx"
import { getBlob } from "actions/blobs.ts"
import { stripFileExtension, stripNextPathParams } from "actions/utils.ts"

export default async function Page({ params }) {
  const prefix = stripNextPathParams( params.path )
  const title = stripFileExtension( params.path )
  const images = await getBlob({ prefix })

  const setup = {
    title: title,
    imgs: images,
  
    shaders: [
      { vert: "/shaders/standard.vert", frag: "/shaders/oceans.frag" }
    ],
  
    sliders: [
      { label: "waves", sliderValue:10, description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."  },
      { label: "zoom", sliderValue:30, description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." }
    ]
  
  }

  return ( 
    <Sketch { ...setup } />
  )
}
