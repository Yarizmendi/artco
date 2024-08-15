
import { Mongo } from "@/mongo/index"
import { SketchLink } from "@/comps/Links/SketchLink"
import Link from "next/link"

const showcases =  await Mongo.db("test").collection("sketches").find().toArray()

export default function Sketches() {
  return (
    <div className="flex flex-wrap items-center justify-center overflow-auto grow">

      <div className="flex items-center w-full">
        <Link href={`sketches/new`}>
          <span className={"ml-12 cursor-pointer text-4xl "+"material-symbols-outlined"}>add_circle</span>
        </Link>
      </div>

      <div className="h-[500px] flex flex-wrap items-center justify-center overflow-auto">
        {showcases.map((img, idx) => <SketchLink title={img.title} blob={img.blob} key={idx} {...img} />)}
      </div>
    </div>
  )
}


