

export const ID = 0
export const TITLE = "TEST"
export const DESCRIPTION = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

export const inputs = {
  "ocean": [
    {
      id: 0,
      label: "zoom",
      uniform: "u_zoom",
      type: "slider",
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
      uniform: "u_waves",
      label: "waves",
      type: "slider",
      description: DESCRIPTION,
      settings: {
        min: 0,
        max: 120,
        value: 10,
        step: 1,
      }
    },
  ]
}


export async function getInputsBySketch(title?) {
  let inputsData = inputs[ title ]
  return inputsData
}