
const shadersBySketch = {

    "city" : [{
        id: 0,
        title: "city",
        vertPath: "/shaders/basic.vert",
        vertBlob: "/shaders/basic.vert",
        fragPath: "/shaders/city.frag",
        fragBlob: "/shaders/city.frag",
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
        vertPath: "/shaders/basic.vert",
        vertBlob: "/shaders/basic.vert",
        fragPath: "/shaders/ocean.frag",
        fragBlob: "/shaders/ocean.frag",
        uniforms: {
            inputs: [ "u_waves", "u_duration" ],
            timers: [ "u_time" ], 
            textures: [ "u_texture" ], 
        },
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

