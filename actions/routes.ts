
const baseNavLinks = [
    { title: "sketches", path: `/${"66bd62276d3999b70d5fd91b"}/sketches`},
    { title: "motions", path: `/motions`},
    { title: "articles", path: `/blog`},
    { title: "paintings", path: `/${"66bd62276d3999b70d5fd91b"}/paintings`}
  ]

  async function getRoutes() {
    return Object.values(baseNavLinks)
  }

  export {
    getRoutes
  }