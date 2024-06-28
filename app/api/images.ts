
export const stem = [
  { path: "yellow_org_collab.jpg" },
  { path: "ballerina.png" },
  { path: "Reclamation.png" },
  { path: "yellow_org_stem.jpg" },
  { path: "orange_actuality.png" },
  { path: "yellow_red_stem.jpg" },
  { path: "blue_red_stem.jpg" },
  { path: "sunset_circles_stem.jpg" },
  { path: "in_search_of_pareto.png" },
  { path: "patents_stem.jpg" },
  { path: "person_stem.jpg" },
  { path: "pink_glimpses.png" },
  { path: "predicting-the-present.png" },
  { path: "quantum_ballerina.png" },
  { path: "quantum-computer.png" },
  { path: "reconfiguring-formality.jpg" },
  { path: "resistance.png" },
  { path: "abstract_toon_stem.jpg" },
  { path: "sid.jpg" },
  { path: "thoughts_wb.png" },
  { path: "yellow_actuality.png" },
  { path: "orange_actuality.png" },
]

export const oceans = [

  { path: "red_ocean.png" },
  { path: "your_ocean_changed.png" },
  { path: "watery_path.jpg" },

]

export const skies = [
  { path: "things_unsaid.png" },
]

export const plants = [
  { path: "sunset_tree.jpg" },
  { path: "mycellium.jpg" },
]

export const general = [
  { path: "nostalgia.jpg" },
  { path: "color_strings.jpg" },
  { path: "confusion.jpg" },
  { path: "gray_man.jpg" },
  { path: "highway.jpg" },
  { path: "purple_woman.jpg" },
  { path: "desert_fog.jpg" },
  { path: "cacti.jpg" },
  { path: "desert_stripes.jpg" },
  { path: "desert_sky.jpg" },
  { path: "gemstone_cliff.jpg" },
  { path: "lizard_eyes.jpg" },
  { path: "candy_paint.jpg" },
  { path: "mania.jpg" },
]

export const places = [
  { path: "industrial_ocean.jpg" },
  { path: "polluted_ocean.jpg" },
]

export const fam = [
  { path: "fam3.jpeg" },
  { path: "fam2.jpg" },
  { path: "fam1.jpg" },
  { path: "fam4.jpg" },
  { path: "fam5.jpg" }
]

export const noiseTextures = [
  { path: "perlin.png" }
]


export const allImages = [
  ...places,
  ...skies,
  ...oceans,
  ...plants,
  ...stem,
  ...general
]

export const colorsSketch = [
  { path: "industrial_ocean.jpg" },
  { path: "red_ocean.png" },
  { path: "polluted_ocean.jpg" },
  { path: "things_unsaid.png" },
  { path: "your_ocean_changed.png" },
  { path: "pools.jpg" },
]

export function getSomeImgs( cnt: number ) {
  return allImages.slice( 0, cnt )
}
