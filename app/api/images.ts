

export const imgDict = {
  window: { id: 40, path: "window.jpg" },
  sf: { id: 40, path: "sf.jpg" },
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
  watery_path: { id: 39, path: "watery_path.jpg" },
}

export const noisesDict = {
  perlin: { id: 0,  path: "perlin.png" }
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
  perlin_noise: { id: 0,  path: "perlin.png" }
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

export const windowPaths = {
  window: { id: 40, path: "window.jpg" },
}

export function getImages({ 
    title, 
    sketch
  }: { title?: string, sketch?: string })
{
  if ( title ) return [ imgDict[ title ] ]
  else if ( sketch == "waves" ) return [ imgDict["red_ocean"] ]
  else if ( sketch == "window" ) return [ imgDict["window"] ]
  else if ( sketch == "stem" ) return Object.values( stemPaths )
  else if ( sketch == "ocean" ) return Object.values( oceanPaths )
  else if ( sketch == "house" ) return Object.values( housePaths )
  else if ( sketch == "all" ) return Object.values( imgDict )
  else return [ imgDict[ "mania" ] ]
}

export function getNoises({
  title
}: { title: string })
{
  if ( title ) return Object.values( noisesDict )
}

