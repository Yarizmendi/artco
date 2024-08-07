
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

function SketchLink({ title, blob, path, tags, description  }: ISketchLink ) {
  title = rmUnderScores(title)
  const ctnClass="w-[300px] m-4 bg-gray-200 dark:bg-slate-950"
  return (
  <Link href={path} className={ctnClass}>
    <Image className="h-[280px] rounded-t" src={blob} alt={title} width={300} height={300} />
    <Title title={title} />
    <Description description={description}/>
    <Tags tags={tags}/>
  </Link>   
  )
}

function Title({ title }) {
  const titleClass = "text-sm p-4"
  return <p className={titleClass}>{title.toUpperCase()}</p>
}

function Description({ description }) {
  const style="mx-4 text-[12px] h-[90px] overflow-hidden"
  return <p className={style}>{description}</p>
}

function Tags({ tags }) {
  tags = tags.meta.concat(tags.object)
  return (
    <div className="flex overflow-hidden m-4">
      {tags.map((tag,key) => <Tag key={key} title={tag} style={"outlined"} /> )}
    </div>
  )
}

export { SketchLink }