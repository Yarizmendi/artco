import { Mongo } from "@/mongo/index"

export const shaderInputsBySketch = {

  waves: [
    {  
    icon: "heat",
    type: "slider",
    label: "waves",
    uniform: "u_waves",
    description: "amplitude of trig function",
    settings: { min: 0, max: 100, value: 30, step: 1 },
  },
  {  
    icon: "zoom_in_map",
    type: "slider",
    label: "zoom",
    uniform: "u_zoom",
    description: "amplitude of trig function",
    settings: { min: 0, max: 120, value: 120, step: 1 },
  }
  ],

  simpleScale: [{
    icon: "chevron_right",
    type: "slider",
    label: "pan",
    uniform: "u_pan",
    description: "goes in the input direction",
    settings: { min: 0.0, max: 2.0, value: 0.10, step: 0.10 },
  }
  ],

  matrixScale: [
    {  
    icon: "zoom_in_map",
    type: "slider",
    label: "scale_x",
    uniform: "u_scale_x",
    description: "input of matrix scaling function",
    settings: { min: 0, max: 1, value: 0.1, step: .1 },
    },
    {  
      icon: "zoom_out_map",
      type: "slider",
      label: "scale_y",
      uniform: "u_scale_y",
      description: "input of matrix scaling function",
      settings: { min: 0, max: 1, value: 0.1, step: .1 },
    },
    {  
      icon: "heat",
      type: "slider",
      label: "waves",
      uniform: "u_waves",
      description: "amplitude of trig function",
      settings: { min: 0, max: 100, value: 30, step: 1 },
    },
    {  
      icon: "zoom_in_map",
      type: "slider",
      label: "zoom",
      uniform: "u_zoom",
      description: "amplitude of trig function",
      settings: { min: 0, max: 120, value: 120, step: 1 },
    }

  ],

  simpleMix: [
    {  
      icon: "instant_mix",
      type: "slider",
      label: "mix step",
      uniform: "u_mix",
      description: "amplitude of trig function",
      settings: { min: 0, max: 1, value: .5, step: .1},
    },
  ],

  stem: [
    {  
      icon: "instant_mix",
      type: "slider",
      label: "range",
      uniform: "u_range",
      description: "amplitude of trig function",
      settings: { min: 0, max: 1, value: .25, step: .25 },
    },
    {  
      icon: "airwave",
      type: "slider",
      label: "threshold",
      uniform: "u_threshold",
      description: "amplitude of trig function",
      settings: { min: 0, max: 1, value: 1, step: .25 },
    },
    {  
      icon: "timer",
      type: "slider",
      label: "timeout",
      uniform: "u_timeout",
      description: "amplitude of trig function",
      settings: { min: 0, max: 120, value: 10, step: 10 },
    },
  ],
    

  image: [
    {

    }
  ]

}

const shadersBySketch = {
  aqua: shaderInputsBySketch.simpleScale,
  city: shaderInputsBySketch.simpleMix,
  oceans: shaderInputsBySketch.waves,
  new: shaderInputsBySketch.matrixScale,
}


export async function getShaderInputsBySketch(title) {
  return shadersBySketch[title]
}

export async function getSketch(title) {
  const col =  await Mongo.db("test").collection("sketches")
  .findOne({ name: title })
  return col
}