
const commonTextures = [
  { type: "texture", uniform: "u_texture" },
]

const shaderTexturesBySketch = {
    city: [
      { type: "texture", uniform: "u_bg" },
      { type: "texture", uniform: "u_fg" },
    ]
  }
  
  export async function getShaderTexturesBySketch(title) {
    return commonTextures.concat(shaderTexturesBySketch[title] || [])
  }