import Link from "next/link"
import Image from "next/image"
import { USERID } from "data/id"

const collections = [
  { title: "sketches", id: 0, path: "/sketches", blob: "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/ballerina.png" },
  { title: "prints", id: 1, path: "/paintings", blob: "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/red_ocean.png" },
  { title: "paintings", id: 2, path: "/paintings", blob: "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/alice_falls.webp" },
]

export default function ArtistPage({ params }) {
  return (
    <div className="flex flex-col justify-center grow">
      <div className={"flex flex-wrap items-center justify-center overflow-auto"}>
      { collections.map(({ title, path, blob },key)=>
        <Link href={ params.user || USERID + path } className={"p-2 m-2"} key={key}>
        <Image src={blob} alt={title} width={600} height={500} className={"max-w-[350px] h-[350px]"} />
        <p className="w-full dark:bg-slate-950 bg-gray-300 p-2 text-3xl">{title.toUpperCase()}</p>
        </Link> )} 
      </div>
    </div>
  )
}
