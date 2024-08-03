
const baseNavLinks = [
    { title: "home", path: "/"},
    { title: "about", path: "/about"},
    { title: "artists", path: "/artists/arizmendi"},
    { title: "showcase", path: "/"}
  ]

  async function getRoutes() {
    return Object.values(baseNavLinks)
  }

  export {
    getRoutes
  }