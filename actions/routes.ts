
const baseNavLinks = [
    { title: "blog", path: `/blog`},
    { title: "motion", path: `/motions`},
    { title: "classic", path: `/${"66bd62276d3999b70d5fd91b"}/paintings`},
    { title: "generative", path: `/${"66bd62276d3999b70d5fd91b"}/sketches`},
  ]

  async function getRoutes() {
    return Object.values(baseNavLinks)
  }

  export {
    getRoutes
  }