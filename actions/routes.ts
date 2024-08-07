
const baseNavLinks = [
    { title: "arizmendi", path: `/${"arizmendi"}`},
    { title: "showcase", path: `/${"arizmendi"}/sketches`},
  ]

  async function getRoutes() {
    return Object.values(baseNavLinks)
  }

  export {
    getRoutes
  }