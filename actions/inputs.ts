

export const ID = 0
export const TITLE = "TEST"
export const DESCRIPTION = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

export const inputs = {
  "u_zoom" : {
    id: 0,
    label: "zoom",
    type: "slider",
    description: DESCRIPTION,
    settings: {
        min: 0,
        max: 60,
        step: 1,
        default: 15,
    }
  },
  "u_waves": {
    id: 1,
    label: "waves",
    type: "slider",
    description: DESCRIPTION,
    settings: {
        min: 0,
        max: 100,
        step: 1,
        default: 10,
    }
  },
  "u_range": {
    id: 1,
    label: "waves",
    type: "slider",
    description: DESCRIPTION,
    settings: {
        min: 0,
        max: 100,
        step: 1,
        default: 10,
    }
  },
  "u_threshold": {
    id: 1,
    label: "waves",
    type: "slider",
    description: DESCRIPTION,
    settings: {
        min: 0,
        max: 100,
        step: 1,
        default: 10,
    }
  },
}


export async function getInputData(title?) {
  let inputsData = inputs[ title ]
  return inputsData
}