
const baseNavLinks = [
    { title: "blog", path: `/blog`},
    { title: "motion", path: `/inputs`},
    { title: "paintings", path: `/${"66bd62276d3999b70d5fd91b"}/paintings`},
    { title: "sketches", path: `/${"66bd62276d3999b70d5fd91b"}/sketches`},
  ]

  async function getRoutes() {
    return Object.values(baseNavLinks)
  }

  export {
    getRoutes
  }