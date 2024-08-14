import { DESCRIPTION } from "actions/utils"
import { getImagesBySketch } from "../images/images"

export const shaderModules = {
  waves: [{  
    icon: "heat",
    type: "slider",
    label: "waves",
    uniform: "u_waves",
    description: "amplitude of trig function",
    settings: { min: 0, max: 1, value: 0.1, step: .1 },
  }],
  simpleScale: [{
    icon: "chevron_right",
    type: "slider",
    label: "pan",
    uniform: "u_pan",
    description: "goes in the input direction",
    settings: { min: 0, max: 1, value: 0.1, step: .1 },
  }],
  matrixScale: [
    {  
    icon: "zoom_in_map",
    type: "slider",
    label: "scale x",
    uniform: "u_scale_y",
    description: "input of matrix scaling function",
    settings: { min: 0, max: 1, value: 0.1, step: .1 },
    },
    {  
      icon: "zoom_out_map",
      type: "slider",
      label: "scale",
      uniform: "u_scale_x",
      description: "input of matrix scaling function",
      settings: { min: 0, max: 1, value: 0.1, step: .1 },
    },
  ],
  noisyMix: [{
    icon: "instant_mix",
    uRange: {  
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
  }]
}

const common = {
  transitions: false,
  description: DESCRIPTION,

  vert: "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/shaders/basic.vert",

  tags: {
    object: ["science", "chemistry", "physics", "engineering"],
    meta: ["conceiving", "theorizing", "systemizing", "stylizing"]
  },

  textures: [
    { type: "texture", uniform: "u_texture" },
  ],

  noises: [
    { title: "perlin", uniform: "u_noise", path: "perlin.png", blob:"https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/perlin.png" }
  ],

}

export const shadersBySketch = {
    "city" : {
        title: "city",
        vert: common.vert,
        frag: `https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/shaders/city.frag`,
        textures: common.textures,
        inputs: {
          ...shaderModules["waves"],
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
        
    },
    
    "stem" : {
       ...common,
        transitions: true,
        frag: "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/shaders/stem.frag",
        shaders: shaderModules.matrixScale
    },

    "image" : {
      ...common,
      title: "image",
      frag: "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/shaders/image.frag",
      displayName: "Image to Shader",
    },

    aqua: {
      transitions: false,
      title: "aqua",

      path: "sketches/aqua",
      displayName: "Aquarium Strolls",
   
      vert: "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/shaders/basic.vert",
      frag: "/scale.frag",

      tags: {
        object: ["science", "chemistry", "physics", "engineering"],
        meta: ["conceiving", "theorizing", "systemizing", "stylizing"]
      },

      images: getImagesBySketch("aqua"),

      noises: [
        { title: "perlin", uniform: "u_noise", path: "perlin.png", blob:"https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/perlin.png" }
      ],

      textures: [
        { type: "texture", uniform: "u_texture" },
      ],

      shaders: shaderModules.simpleScale

    },

    "oceans" : {
      ...common,
        title: "oceans",
        images: getImagesBySketch("oceans"),
        frag: "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/shaders/oceans.frag",
        displayName: "Ocean Listening",
        shaders: shaderModules.waves,

    },

    "new" : {
       ...common,
        title: "oceans",
        frag: "/new.frag",
        displayName: "Ocean Listening",
  },

}

export async function getShadersBySketch( title ) {

    let res = {
      ...common,
      displayName: "Ocean Listening",
      title: title,
      frag: "/scale.frag",
      path: `sketches/${title}`,
      images: await getImagesBySketch(title),
      shaders: shaderModules.simpleScale,
    }

    return res;
  }

