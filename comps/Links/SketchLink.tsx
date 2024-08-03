
import Link from "next/link"
import Image from "next/image"
import { rmUnderScores } from "actions/utils"
import { Tag } from "../Tags/tag"

interface ISketchLink {
  title: string
  blob: string
  path?: string
  tags?: any, 
  description?: string
}

export const bggd = " bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text"

function SketchLink({ title, blob, path, tags, description  }: ISketchLink ) {
  title = rmUnderScores(title)

  return (
  <Link
    href={ path }
    className="
    cursor-pointer p-4
    flex flex-col justify-around w-[450px] tracking-widest">

    <div className="dark:bg-gray-950 bg-gray-200 font-normal px-3 py-1 w-fit rounded">
      <p className={"tracking-widest text-xs"}>{title.toUpperCase()}</p>
    </div>

    <Image 
    priority
    src={ blob } 
    alt={ title } 
    width={ 500 }
    height={ 350 }
    className="w-full h-[350px] rounded-lg" />

   <div className="w-full h-[160px] overflow-hidden dark:bg-gray-950 bg-gray-200 p-4 flex flex-col justify-around">
    {<p className="text-[12px] h-[50px] overflow-hidden font-normal">{description}</p>}
    <span className="flex overflow-hidden">
      { tags.object && tags.object.map((tag,key) => <Tag key={key} title={tag} style={"outlined"} /> )}
      { tags.meta && tags.meta.map((tag,key) => <Tag key={key} title={tag} style={"outlined"} /> )}
    </span>
  </div>

  </Link>   
  )
}

export { SketchLink }