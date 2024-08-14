
import Sketch from "views/PathSketch"
import { getImagesBySketch } from "@/api/images/images"
import { DESCRIPTION } from "actions/utils"
import { getShaderInputsBySketch } from "@/api/shaders/inputs/shader_inputs"
import { getShaderFilesBySketch } from "@/api/shaders/files/shader_files"
import { getShaderTexturesBySketch } from "@/api/shaders/textures/shader_textures"

const common = {
  transitions: false,
  description: DESCRIPTION,

  vert: "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/shaders/basic.vert",

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

  let sketchData = {
    ...common,
    displayName: "Ocean Listening",
    title: title,
    path: `sketches/${title}`,
    images: await getImagesBySketch(title),
    frag: await getShaderFilesBySketch(title),
    shaders: await getShaderInputsBySketch(title),
    textures: await getShaderTexturesBySketch(title),
  }

  return <Sketch {...sketchData} />
}
