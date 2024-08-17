
// const newSketch = await sketch.create({

//     transitions: false,
//     creator: "66bd62276d3999b70d5fd91b",
//     vert: "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/shaders/basic.vert",
//     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",

//     tags: {
//       object: ["science", "chemistry", "physics", "engineering"],
//       meta: ["conceiving", "theorizing", "systemizing", "stylizing"]
//     },

//     noises: [
//       { title: "perlin", uniform: "u_noise", path: "perlin.png", blob:"https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/perlin.png" }
//     ],

//     frag: "/matrixScale.frag",
//     title: "new",
//     displayName: "New Beginnings",
//     path: "sketches/new",
//     blob: "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/sid.jpg",

//     images: [
//       { title: "sid", id: 17, path: "sid.jpg", blob: "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/sid.jpg" },
//     ],

//     textures: [
//       { type: "texture", uniform: "u_texture"},
//     ],

//     shaders: [
//       {  
//         icon: "zoom_in_map",
//         type: "slider",
//         label: "scale_x",
//         uniform: "u_scale_x",
//         description: "input of matrix scaling function",
//         settings: { min: 0, max: 1, value: 0.1, step: .1 },
//         },
//         {  
//           icon: "zoom_out_map",
//           type: "slider",
//           label: "scale_y",
//           uniform: "u_scale_y",
//           description: "input of matrix scaling function",
//           settings: { min: 0, max: 1, value: 0.1, step: .1 },
//         },
//         {  
//           icon: "heat",
//           type: "slider",
//           label: "waves",
//           uniform: "u_waves",
//           description: "amplitude of trig function",
//           settings: { min: 0, max: 100, value: 30, step: 1 },
//         },
//         {  
//           icon: "zoom_in_map",
//           type: "slider",
//           label: "zoom",
//           uniform: "u_zoom",
//           description: "amplitude of trig function",
//           settings: { min: 0, max: 120, value: 120, step: 1 },
//         }    
//     ],
      
// })

// console.log(newSketch)


const stemInputs = [
  {  
    icon: "airwave",
    type: "slider",
    label: "threshold",
    uniform: "u_threshold",
    description: "percentage of mixture",
    settings: { min: 0, max: 1, value: 1, step: .1 },
  },
  {  
    icon: "instant_mix",
    type: "slider",
    label: "range",
    uniform: "u_range",
    description: "size of noise",
    settings: { min: 0, max: 1, value: 0.25, step: .01 },
  },
  {  
    icon: "timer",
    type: "slider",
    label: "transitions",
    uniform: "u_change_every",
    description: "transition timer",
    settings: { min: 0, max: 60, value: 5, step: 1 },
},
]
