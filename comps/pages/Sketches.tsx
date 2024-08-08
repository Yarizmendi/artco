
import { showcaseSketches } from "@/api/images/images"
import { SketchLink } from "@/comps/Links/SketchLink"
import { ICONS_FILL, ICONS_OUTLINE } from "@/p5/Controls"
import Link from "next/link"

const showcases = await Object.values(showcaseSketches)

export default function Sketches() {
  return (
    <div className="flex flex-wrap items-center justify-center overflow-auto grow">

      <div className="flex items-center w-full">
        <Link href={`sketches/new`}>
          <span className={"ml-12 cursor-pointer text-4xl "+"material-symbols-outlined"}>add_circle</span>
        </Link>
      </div>

      <div className="h-[500px] flex flex-wrap items-center justify-center overflow-auto">
        {showcases.map((img, idx) => <SketchLink key={idx} {...img} />)}
      </div>
    </div>
  )
}


