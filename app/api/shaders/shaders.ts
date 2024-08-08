
const shaderModules = {
  waves: {  
    icon: "heat",
    type: "slider",
    label: "waves",
    uniform: "u_waves",
    description: "amplitude of trig function",
    settings: { min: 0, max: 1, value: 0.1, step: .1 },
  },
  simpleScale: {
    icon: "arrow",
    type: "slider",
    label: "pan",
    uniform: "u_pan",
    description: "goes in the input direction",
    settings: { min: 0, max: 1, value: 0.1, step: .1 },
  },
  matrixScale: {  
    icon: "zoom_in_map",
    type: "slider",
    label: "zoom",
    uniform: "u_zoom",
    description: "input of matrix scaling function",
    settings: { min: 0, max: 1, value: 0.1, step: .1 },
  },
  noisyMix: {
    icon: "instant_mix",
    uRange:{  
      type: "slider",
      label: "threshold",
      uniform: "u_threshold",
      description: "the amount to represent the second color",
      settings: { min: 0, max: 1, value: 1, step: .1 },
    },
    uThreshold: {  
      type: "slider",
      label: "range",
      uniform: "u_range",
      description: "the amount to represent the noiser",
      settings: { min: 0, max: 1, value: 0.25, step: .01 },
    },
    uNoise: {  
      type: "slider",
      label: "range",
      uniform: "u_range",
      description: "the amount to represent the noiser",
      settings: { min: 0, max: 1, value: 0.25, step: .01 },
    },
  }
}

const common = {
  vert: "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/shaders/basic.vert",
  timers: [
    { type: "timer", uniform: "u_time" }
  ],
  textures: [
    { type: "texture", uniform: "u_texture" },
  ],
  noises: [
    { type: "texture", uniform: "u_noise" }
  ],
  inputs: [
    shaderModules.waves
  ]
}

export const shadersBySketch = {
    "city" : {
        title: "city",
        vert: common.vert,
        frag: `https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/shaders/city.frag`,
        timers: common.timers,
        rexrures: common.textures,
        inputs: {
          ...common.inputs,
            topTimer: {  
                type: "slider",
                label: "topTime",
                uniform: "u_topTime",
                description: "top timer",
                settings: { min: 0, max: 100, value: 10, step: 1 },
            },
            btmTimer: {  
              type: "slider",
              label: "btmTime",
              uniform: "u_btmTime",
              description: "bottom timer",
              settings: { min: 0, max: 100, value: 15, step: 1 },
            },
        },
        noises:common.noises
        
    },
    
    "stem" : {
        transitions: true,
        title: "stem",
        vert: common.vert,
        frag: "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/shaders/stem.frag",
        textures: {
          ...common.textures,
        },
        inputs: {
          ...common.inputs,
          ...shaderModules.noisyMix
        },
        timers: {
          ...common.timers,
        },
        noises: {
          ...common.noises
        }
    },

    "image" : {
      ...common,
      title: "image",
      frag: "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/shaders/image.frag",
      displayName: "Image to Shader",
    },

    "aqua": {
      ...common,
      title: "aqua",
      frag: "/aqua.frag",
      displayName: "Aquarium Strolls",
    },

    "oceans" : {
      ...common,
        title: "oceans",
        frag: "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/shaders/oceans.frag",
        displayName: "Ocean Listening",
    },

}

export async function getShadersBySketch( title ) {
    return shadersBySketch[ title ] || shadersBySketch.image
  }

