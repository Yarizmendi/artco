
import Link from "next/link"
import Image from "next/image"
import Tag from "@/comps/Tags/tag"

export default function SketchLink({sketch}) {
  return (
    <Link prefetch={false} href={sketch.path} className={"w-[300px] min-h-[340px] m-4 bg-gray-200 dark:bg-slate-950 text-sm"}>
      <Image className={"h-[280px] w-[300px] rounded-t"} src={sketch.blob} alt={sketch.title} width={250} height={250} />
      <p className="px-2">{ sketch.title }</p>
      <p className={"px-2 py-2 h-[30px] overflow-hidden"}>{sketch.description}</p>
      <div className="flex overflow-hidden m-2 gap-2">
        {sketch.tags.object.map((tag,key) => <Tag key={key} title={tag} /> )}
      </div>
  </Link>
  )

}


