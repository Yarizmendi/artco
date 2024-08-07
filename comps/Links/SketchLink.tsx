
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
  const ctnClass="m-4 min-w-[300px] max-w-[400px] bg-gray-200 dark:bg-slate-950"
  return (
  <Link href={path} className={ctnClass}>
    <Image className="h-[340px] rounded-t" priority src={blob} alt={title} width={500} height={400} />
    <Title title={title} />
    <Description description={description}/>
    <Tags tags={tags}/>
  </Link>   
  )
}

function Title({ title }) {
  const titleClass = "text-sm p-2 rounded"
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