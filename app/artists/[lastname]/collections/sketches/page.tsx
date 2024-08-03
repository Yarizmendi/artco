
import { showcaseSketches } from "actions/images"
import { SketchLink } from "@/comps/Links/SketchLink"

export default async function SketchesPage() {
  const showcases = Object.values(showcaseSketches).reverse()
  return (
    <div className="max-w-11/12 m-4 h-[540px] flex flex-wrap items-center overflow-auto">
      {showcases.map((img, idx) => <SketchLink key={idx} {...img} />)}
    </div>
  )
}




