
import { showcaseSketches } from "actions/images"
import { SketchLink } from "@/comps/Links/SketchLink"

export default async function SketchesPage() {
  const showcases = Object.values(showcaseSketches).reverse()
  return (
    <div className="flex flex-wrap items-center justify-center overflow-auto grow">
      <div className="h-[480px] flex flex-wrap items-center justify-center overflow-auto">
        {showcases.map((img, idx) => <SketchLink key={idx} {...img} />)}
      </div>
    </div>
  )
}




