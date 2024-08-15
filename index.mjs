

import UserModel from "./mongo/models/user.js"
import SketchModel from "./mongo/models/sketch.js"

async function getSketchByTitle() {
  const sketch = await SketchModel.findOne().populate("creator").exec()
  console.log(sketch.creator);
}

async function updateSketch(title="stem") {
  const sketch = await SketchModel.findOne({title})
  console.log(sketch.frag);
}


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

// console.log(sketch.shaders);
// updateSketch()
