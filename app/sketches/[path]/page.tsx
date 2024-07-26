
import Sketch from "app/sketches/Sketch"
import { getImageData } from "actions/images"
import { getBlobCollection } from "actions/blobs.ts"

export default async function Page({ params }) {
  const title = params.path
  const collection = ( await getImageData( title )).imagePaths
  const imgBlobs = await getBlobCollection( collection )

  const setup = {
    title: title,
    imgs: imgBlobs,
  
    shaders: [
      { 
        vert: "/shaders/standard.vert", 
        frag: "/shaders/oceans.frag",
         uniforms: [ "u_time", "u_waves", "u_duration", "u_texture"], 
      }
    ],

    sliders: [
      { label: "waves", sliderValue:10, description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."  },
      { label: "duration", sliderValue:30, description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." }
    ]
  
  }

  return <Sketch { ...setup } />
  
}
