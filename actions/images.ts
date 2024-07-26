
export const noisesDict = {
  perlin: { id: 0,  path: "noise/perlin.png" }
}

export const stemPaths = {
  yellow_org_collab: { id: 0, path: "yellow_org_collab.jpg" },
  ballerina: { id: 1, path: "ballerina.png" },
  Reclamation: { id: 2, path: "Reclamation.png" },
  yellow_org_stem: { id: 3, path: "yellow_org_stem.jpg" },
  yellow_red_stem: { id: 4, path: "yellow_red_stem.jpg" },
  blue_red_stem: { id: 5, path: "blue_red_stem.jpg" },
  sunset_circles_stem: { id: 6, path: "sunset_circles_stem.jpg" },
  in_search_of_pareto: { id: 7, path: "in_search_of_pareto.png" },
  patents_stem: { id: 8, path: "patents_stem.jpg" },
  person_stem: { id: 9, path: "person_stem.jpg" },
  pink_glimpses: { id: 10, path: "pink_glimpses.png" },
  predicting_the_present: { id: 11, path: "predicting_the_present.png" },
  quantum_ballerina: { id: 12, path: "quantum_ballerina.png" },
  quantum_computer: { id: 13, path: "quantum_computer.png" },
  reconfiguring_formality: { id: 14, path: "reconfiguring_formality.jpg" },
  resistance: { id: 15, path: "resistance.png" },
  abstract_toon_stem: { id: 16, path: "abstract_toon_stem.jpg" },
  sid: { id: 17, path: "sid.jpg" },
  thoughts_wb: { id: 18, path: "thoughts_wb.png" },
  yellow_actuality: { id: 19, path: "yellow_actuality.png" },
  orange_actuality: { id: 20, path: "orange_actuality.png" },
}

export const housePaths = {
  your_ocean_changed: { id: 34, path: "your_ocean_changed.png" },
  watery_path: { id: 39, path: "watery_path.jpg" },
}

export const oceanPaths = {
  industrial_ocean: { id: 36, path: "industrial_ocean.jpg" },
  red_ocean: { id: 33, path: "red_ocean.png" },
  polluted_ocean: { id: 35, path: "polluted_ocean.jpg" },
  your_ocean_changed: { id: 34, path: "your_ocean_changed.png" },
}

export const wavesPaths = {
  red_ocean: { id: 33, path: "red_ocean.png" },
}

export function getNoises({ title }: { title: string }) {
  if ( title ) return Object.values( noisesDict )
}

export const sketchDict = {
  stem: stemPaths,
  waves: wavesPaths,
  ocean: oceanPaths,
  house: housePaths,
}


export const imgDict = {
  ...sketchDict,
  ...stemPaths,
  ...wavesPaths,
  ...oceanPaths,
  ...housePaths,
  window: { id: 40, path: "window.jpg" },
  sf: { id: 40, path: "sf.jpg" },
  nostalgia: { id: 21, path: "nostalgia.jpg" },
  color_strings: { id: 22, path: "color_strings.jpg" },
  confusion: { id: 23, path: "confusion.jpg" },
  gray_man: { id: 24, path: "gray_man.jpg" },
  highway: { id: 25, path: "highway.jpg" },
  desert_fog: { id: 26, path: "desert_fog.jpg" },
  cacti: { id: 27, path: "cacti.jpg" },
  desert_sky: { id: 28, path: "desert_sky.jpg" },
  gemstone_cliff: { id: 29, path: "gemstone_cliff.jpg" },
  lizard_eyes: { id: 30, path: "lizard_eyes.jpg" },
  candy_paint: { id: 31, path: "candy_paint.jpg" },
  mania: { id: 32, path: "mania.jpg" },
  red_ocean: { id: 33, path: "red_ocean.png" },
  your_ocean_changed: { id: 34, path: "your_ocean_changed.png" },
  polluted_ocean: { id: 35, path: "polluted_ocean.jpg" },
  industrial_ocean: { id: 36, path: "industrial_ocean.jpg" },
  sunset_tree: { id: 37, path: "sunset_tree.jpg" },
  mycellium: { id: 38, path: "mycellium.jpg" },
}

const imagesBySketch = {
  mix: [
    { title: "red_ocean", id: 0, path: "red_ocean.png", blob: "" },
    { title: "polluted_ocean", id: 1, path: "polluted_ocean.jpg", blob: "" },
    { title: "industrial_ocean", id: 2, path: "industrial_ocean.jpg", blob: "" },
    { title: "your_ocean_changed", id: 3, path: "your_ocean_changed.png",  blob: "" },
  ]
}


export async function getImagesBySketch( title ) {
  return imagesBySketch[title]
}


export async function getImageData( title?) {
  let imageData = imgDict[ title ] || imgDict
  return {
    imageData,
    imageKeys: Object.keys( imageData ),
    imagePaths: Object.values( imageData )
  }
}




