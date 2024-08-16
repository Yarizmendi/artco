
const baseNavLinks = [
    { title: "sketches", path: `/${"66bd62276d3999b70d5fd91b"}/sketches`},
    { title: "prints", path: `/${"66bd62276d3999b70d5fd91b"}/prints`},
    { title: "paintings", path: `/${"66bd62276d3999b70d5fd91b"}/paintings`}
  ]

  async function getRoutes() {
    return Object.values(baseNavLinks)
  }

  export {
    getRoutes
  }