
import Link from "next/link"
import Image from "next/image"
import Tag from "@/comps/Tags/tag"

export default function SketchLink({sketch}) {
  return (
    <Link  href={sketch.path} className={"w-[300px] m-6 bg-gray-200 dark:bg-slate-950"}>
    <Image className={"h-[280px] rounded-t"} src={sketch.blob} alt={sketch.title} width={500} height={500} />
    <p className={"text-sm p-4"}>{ sketch.title }</p>
    <p className={"px-4 text-[12px] h-[90px] overflow-hidden"}>{sketch.description}</p>
    <div className="flex overflow-hidden my-2 p-1">
     {sketch.tags.object.map((tag,key) => <Tag key={key} title={tag} style={"outlined"} /> )}
   </div>
  </Link>
  )

}


