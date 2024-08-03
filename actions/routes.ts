
const baseNavLinks = [
    { title: "home", path: "/"},
    { title: "about", path: "/about"},
    { title: "artists", path: "/artists/arizmendi"},
    { title: "showcase", path: "/showcase"}
  ]

  async function getRoutes(page) {
    if(page == "home") return baseNavLinks
  }

  export {
    getRoutes
  }