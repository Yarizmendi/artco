
import { getShowcaseSketches } from "actions/images"
import { SketchLink } from "@/comps/Links/SketchLink"
import { DESCRIPTION } from "actions/shaders"

const showcases = await getShowcaseSketches()

export default function Homepage() {
  return (
    <div className="flex flex-col h-screen">
   
        <p className="w-11/12 self-center dark:bg-slate-950 text-sm fnt-light p-4 m-4">
          { DESCRIPTION }
        </p>

        <div className="h-[450px] flex flex-wrap justify-center items-center overflow-auto">
         {showcases.map((img, idx) => <SketchLink key={idx} {...img} />)}
        </div>
   

    </div>
  )
}




