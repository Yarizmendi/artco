
const baseNavLinks = [
    { title: "blog", path: `/blog`},
    { title: "motion", path: `/motions`},
    { title: "artwork", path: `/${"66bd62276d3999b70d5fd91b"}/paintings`},
    { title: "artmachine", path: `/${"66bd62276d3999b70d5fd91b"}/sketches`},
  ]

  async function getRoutes() {
    return Object.values(baseNavLinks)
  }

  export {
    getRoutes
  }