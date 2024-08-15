
import { Mongo } from "@/mongo/index"
import Sketch from "views/PathSketch"


export default async function Page({ params }) {
  const sketchData =  await Mongo.db("test").collection("sketches")
  .findOne({ title: params.path })

  console.log(sketchData)
  // @ts-ignore
  return <Sketch {...sketchData} />
}
