
export const ID = 0
export const TITLE = "TEST"
export const DESCRIPTION = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

const defaultUniforms = {
    inputs: [
        {
            id: 0,
            type: "slider",
            label: "waves",
            uniform: "u_waves",
            description: DESCRIPTION,
            settings: {
              min: 0,
              max: 120,
              value: 10,
              step: 1,
            }
        },
    ],
    timers: [
        {
            id: 0,
            type: "timer",
            uniform: "u_time",
        },
    ],
    textures: [
        {
            id: 0,
            type: "texture",
            uniform: "u_texture",
        }
    ],
}


const shadersBySketch = {

    "city" : [{
        id: 0,
        title: "city",
        frag: `https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/shaders/city.frag`,
        inputs: [
            {  
              uniform: "u_waves",
              description: DESCRIPTION,
              setup: { id: 0, type: "slider", label: "waves", uniform: "u_waves" },
              settings: { min: 0, max: 100, value: 10, step: 1 },
              p5Elements: [ 
                { id: 0, type: "slider", label: "sliderInput" },
                { id: 1, type: "paragraph", label: "sliderValue" },
              ],
            },
        ],
        timers: [
            { id: 0, type: "timer", uniform: "u_time" },
            { id: 1, type: "timer", uniform: "u_topTime" },
            { id: 2, type: "timer", uniform: "u_btmTime" },
        ],
        textures: [
            { id: 0, type: "texture", uniform: "u_industrial_ocean" },
            { id: 1, type: "texture", uniform: "u_polluted_ocean" },
            { id: 2, type: "texture", uniform: "u_red_ocean" }
        ]
    }],

    "oceans" : [{
        id: 2,
        title: "oceans",
        frag: "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/shaders/oceans.frag",
        timers: [{ id: 0, type: "timer", uniform: "u_time" }],
        textures: [{ id: 2, type: "texture", uniform: "u_texture" }],
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
        timers: [{ id: 0, type: "timer", uniform: "u_time" }],
        textures: [{ id: 0, type: "texture", uniform: "u_texture" }],
        inputs: [
            {  
              uniform: "u_waves",
              description: DESCRIPTION,
              setup: { id: 0, type: "slider", label: "waves", uniform: "u_waves" },
              settings: { min: 0, max: 100, value: 10, step: 1 },
              p5Element: { id: 0, type: "slider", label: "sliderInput" },
              
            },
        ],
    }],

    "stem" : [{
        id: 3,
        title: "stem",
        vertPath: "/shaders/basic.vert",
        frag: "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/shaders/stem.frag",
        inputs: [ "u_range", "u_theshold" ],
        timers: [ "u_time", "u_timeout" ], 
        textures: [ "u_background", "u_foreground", "u_noise" ], 
    }],
    
}

export async function getShadersBySketch( title ) {
    return shadersBySketch[ title ]
}

export async function getShaderData( title? ) {
    let shadersData = shadersBySketch[ title ] || shadersBySketch.image
    return {
        shadersData,
        shadersKeys: Object.keys( shadersData ),
        shaderValues: Object.values( shadersData )
      }
  }

