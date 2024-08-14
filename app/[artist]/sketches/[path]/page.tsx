
import Sketch from "views/PathSketch"
import { DESCRIPTION } from "actions/utils"
import { getSketchImages } from "@/api/images/route"
import { getShaderFiles } from "@/api/shaders/files/route"
import { getShaderInputs } from "@/api/shaders/inputs/route"
import { getShaderTextures } from "@/api/shaders/textures/route"


const common = {
  transitions: false,
  description: DESCRIPTION,

  tags: {
    object: ["science", "chemistry", "physics", "engineering"],
    meta: ["conceiving", "theorizing", "systemizing", "stylizing"]
  },

  noises: [
    { title: "perlin", uniform: "u_noise", path: "perlin.png", blob:"https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/perlin.png" }
  ],

}

export default async function Page({ params }) {

  const title = params.path

  const { images } = await getSketchImages(title)
  const { inputs } = await getShaderInputs(title)
  const { vert, frag } = await getShaderFiles(title)
  const { textures } = await getShaderTextures(title)

  let sketchData = {
    ...common,
    displayName: "Ocean Listening",
    title: title,
    path: `sketches/${title}`,
    vert, 
    frag,
    images,
    textures,
    shaders: inputs,
  }

  return <Sketch {...sketchData} />
}
