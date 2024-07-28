
export const ID = 0
export const TITLE = "TEST"
export const DESCRIPTION = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

const shadersBySketch = {
    "city" : [{
        id: 0,
        title: "city",
        frag: `https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/shaders/city.frag`,
        timers: [
          { id: 0, type: "timer", uniform: "u_time" },
        ],
        textures: [
          { id: 0, type: "texture", uniform: "u_red_ocean" },
          { id: 0, type: "texture", uniform: "u_polluted_ocean" },
          { id: 0, type: "texture", uniform: "u_industrial_ocean" },
        ],
        inputs: [
            {  
              id: 0,
              type: "slider",
              label: "waves",
              uniform: "u_waves",
              description: DESCRIPTION,
              settings: { min: 0, max: 100, value: 10, step: 1 },
              
            },
            {  
                id: 1,
                type: "slider",
                label: "topTime",
                uniform: "u_topTime",
                description: DESCRIPTION,
                settings: { min: 0, max: 100, value: 10, step: 1 },
            },
            {  
              id: 1,
              type: "slider",
              label: "btmTime",
              uniform: "u_btmTime",
              description: DESCRIPTION,
              settings: { min: 0, max: 100, value: 10, step: 1 },
          },
        ],
    }],

    "oceans" : [{
        id: 2,
        title: "oceans",
        frag: "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/shaders/oceans.frag",
        timers: [
          { id: 0, type: "timer", uniform: "u_time" }
        ],
        textures: [
          { id: 2, type: "texture", uniform: "u_texture" }
        ],
        inputs: [
            {  
              id: 0,
              type: "slider",
              label: "waves",
              uniform: "u_waves",
              description: DESCRIPTION,
              settings: { min: 0, max: 100, value: 10, step: 1 },
              
            },
            {  
                id: 1,
                type: "slider",
                label: "duration",
                uniform: "u_duration",
                description: DESCRIPTION,
                settings: { min: 0, max: 100, value: 10, step: 1 },
              },
        ],
    }],

    "image" : [{
        id: 4,
        title: "image",
        frag: "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/shaders/image.frag",
        timers: [
          { id: 0, type: "timer", uniform: "u_time" }
        ],
        textures: [
          { id: 0, type: "texture", uniform: "u_background" }
        ],
        inputs: [
            {  
              id: 0,
              type: "slider",
              label: "waves",
              uniform: "u_waves",
              description: DESCRIPTION,
              settings: { min: 0, max: 100, value: 10, step: 1 },
              
            },
            {  
                id: 1,
                type: "slider",
                label: "duration",
                uniform: "u_duration",
                description: DESCRIPTION,
                settings: { min: 0, max: 100, value: 10, step: 1 },
              },
        ],
    }],

    "stem" : [{
        id: 3,
        title: "stem",
        frag: "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/shaders/stem.frag",
        timers: [
          { id: 0, type: "timer", uniform: "u_time" },
          { id: 0, type: "timer", uniform: "u_timeout" },
        ],
        textures: [
          { id: 0, type: "texture", uniform: "u_background" },
          { id: 0, type: "texture", uniform: "u_foreground" },
          { id: 0, type: "texture", uniform: "u_noise" }
        ],
        inputs: [
            {  
              id: 0,
              type: "slider",
              label: "range",
              uniform: "u_range",
              description: DESCRIPTION,
              settings: { min: 0, max: 100, value: 10, step: 1 },
              
            },
            {  
                id: 1,
                type: "slider",
                label: "threshold",
                uniform: "u_threshold",
                description: DESCRIPTION,
                settings: { min: 0, max: 100, value: 10, step: 1 },
            },
        ],
    }],
}

export async function getShadersBySketch( title ) {
    return shadersBySketch[ title ] || shadersBySketch.image
  }

