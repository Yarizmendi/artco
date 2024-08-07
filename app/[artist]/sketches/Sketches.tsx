
import { showcaseSketches } from "actions/images"
import { SketchLink } from "@/comps/Links/SketchLink"

const showcases = await Object.values(showcaseSketches).reverse()

export default function Sketches() {
  return (
    <div className="flex flex-wrap items-center justify-center overflow-auto grow">
      <div className="h-[480px] flex flex-wrap items-center justify-center overflow-auto">
        {showcases.map((img, idx) => <SketchLink key={idx} {...img} />)}
      </div>
    </div>
  )
}


