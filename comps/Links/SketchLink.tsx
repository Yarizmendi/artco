
import Link from "next/link"
import Image from "next/image"
import { rmUnderScores } from "actions/utils"
import { Tag } from "../tag"

interface ISketchLink {
  title: string
  blob: string
  path?: string
  tags?: any, 
  description?: string
}

function SketchLink({ title, blob, path, tags, description  }: ISketchLink ) {
  title = rmUnderScores(title)

  return (
  <Link
    href={ path }
    className="
    cursor-pointer p-4
    flex flex-col justify-around w-[450px]">

    <p className="px-3 py-2 w-fit tracking-widest text-xs dark:bg-gray-950">{title.toUpperCase()}</p>

    <Image 
    priority
    src={ blob } 
    alt={ title } 
    width={ 500 }
    height={ 350 }
    className="w-full h-[350px] rounded-lg" />

   <div className="w-full h-[160px] overflow-hidden dark:bg-gray-950 p-4 flex flex-col justify-around">
    {<p className="text-[12px] h-[50px] overflow-hidden">{description}</p>}
    <span className="flex overflow-hidden">
      { tags.object && tags.object.map((tag,key) => <Tag key={key} title={tag} /> )}
      { tags.meta && tags.meta.map((tag,key) => <Tag key={key} title={tag} /> )}
    </span>
  </div>

  </Link>   
  )
}

export { SketchLink }