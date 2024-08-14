
const shaderFilesBySketch = {
    aqua: "/simpleScale.frag",
    city: "/simpleMix.frag",
    oceans: "/oceans.frag",
    new: "/matrixScale.frag",
  }
  
  export async function getShaderFilesBySketch(title) {
    return shaderFilesBySketch[title]
  }