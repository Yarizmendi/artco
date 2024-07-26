
export const ID = 0
export const TITLE = "TEST"
export const DESCRIPTION = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

const shadersBySketch = {

    "city" : [{
        id: 0,
        title: "city",
        vert: "/shaders/basic.vert",
        frag: "/shaders/city.frag",
        uniforms: {
            inputs: [ "u_waves" ],
            timers: [ "u_time", "u_topTime", "u_btmTime" ], 
            textures: [ "u_industrial_ocean", "u_red_ocean", "u_polluted_ocean"], 
        },
    }],

    "house" : [{
        id: 1,
        title: "house",
        vertPath: "/shaders/basic.vert",
        vertBlob: "/shaders/basic.vert",
        fragPath: "/shaders/house.frag",
        fragBlob: "/shaders/house.frag",
        uniforms: {
            inputs: [ ],
            timers: [ "u_time" ], 
            textures: [ "u_background", "u_foreground" ], 
        },
    }],

    "ocean" : [{
        id: 2,
        title: "ocean",
        vert: "/shaders/basic.vert",
        frag: "/shaders/ocean.frag",
        inputs: [
            {
                id: 0,
                label: "zoom",
                type: "slider",
                uniform: "u_zoom",
                description: DESCRIPTION,
                settings: {
                    min: 0,
                    max: 120,
                    value: 30,
                    step: 1,
                }
            },
            {
                id: 1,
                label: "waves",
                type: "slider",
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
        textures: [
            {
                id: 3,
                label: "texture",
                type: "p5.Image",
                uniform: "u_texture",
            }
        ],
        timers: [
            {
                id: 2,
                label: "time",
                type: "p5.millis",
                uniform: "u_time",
            },
        ],
    }],

    "stem" : [{
        id: 3,
        title: "stem",
        vertPath: "/shaders/basic.vert",
        vertBlob: "/shaders/basic.vert",
        fragPath: "/shaders/stem.frag",
        fragBlob: "/shaders/stem.frag",
        uniforms: {
            inputs: [ "u_range", "u_theshold" ],
            timers: [ "u_time", "u_timeout" ], 
            textures: [ "u_background", "u_foreground", "u_noise" ], 
        },
    }],

    "image" : [{
        id: 4,
        title: "image",
        vertPath: "/shaders/basic.vert",
        vertBlob: "/shaders/basic.vert",
        fragPath: "/shaders/image.frag",
        fragBlob: "/shaders/image.frag",
        uniforms: {
            inputs: [],
            timers: [], 
            textures: [ "u_background" ], 
        },
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

