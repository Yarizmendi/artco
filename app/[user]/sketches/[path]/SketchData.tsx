

// import Sketch from "./PathSketch"
// import { UseSketch } from "../api/UseSketches"
// import { getSketchByTitle } from "actions/sketches/getSketchActions"

// export async function SketchData({ user, path }) {
//     // const { data, error, isLoading, isValidating, mutate } = UseSketch({ creatorId: user, title: path })
//     const { vert, frag, title, images, noises, inputs, displayName, description, textures } = await getSketchByTitle({ title: path })
//     return <Sketch vert={vert} frag={frag} transitions={false} 
//     title={title} displayName={displayName} description={description} 
//     images={images} noises={noises} inputs={inputs} textures={textures} />
// }