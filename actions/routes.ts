
const baseNavLinks = [
    { title: "home", path: "/"},
    { title: "artists", path: `/${"arizmendi"}`},
    { title: "showcase", path: "/"}
  ]

  async function getRoutes() {
    return Object.values(baseNavLinks)
  }

  export {
    getRoutes
  }