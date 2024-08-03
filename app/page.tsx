
import { getShowcaseSketches } from "actions/images"
import { SketchLink } from "@/comps/Links/SketchLink"

export default async function Home() {
  const showcases = await getShowcaseSketches()
  return (
    <div className="w-full max-h-[560px] flex flex-wrap overflow-auto">
      {showcases.map((img, idx) => <SketchLink key={idx} {...img} />)}
    </div>
  )
}
