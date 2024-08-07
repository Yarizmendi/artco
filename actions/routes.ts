
const baseNavLinks = [
    { title: "sketches", path: `/${"arizmendi"}/sketches`},
    { title: "prints", path: `/${"arizmendi"}/prints`},
    { title: "paintings", path: `/${"arizmendi"}/paintings`}
  ]

  async function getRoutes() {
    return Object.values(baseNavLinks)
  }

  export {
    getRoutes
  }