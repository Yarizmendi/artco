import Link from "next/link"
import Image from "next/image"

const collections = [
  { title: "sketches", id: 0, path: "collections/sketches", blob: "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/ballerina.png" },
  { title: "prints", id: 1, path: "collections/prints", blob: "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/red_ocean.png" },
  { title: "paintings", id: 2, path: "collections/paintings", blob: "/alice_falls.webp" },
]

export function CollectionsPage() {

  return (
    <div className="border border-yellow-500 flex justify-around">
    { collections.map(({ title, path, blob },key)=>
      <Link href={ path } className="border border-yellow-500" key={key}>
       <Image 
        priority 
        src={blob} 
        alt={title} 
        width={600} 
        height={500}
        className={"max-w-[450px] h-[350px]"}
        />
        <div className="w-full dark:bg-gray-950 p-2">
          <p className="text-3xl">{title.toUpperCase()}</p>
        </div>
      </Link>
    )}
    </div>
  )
}

export default CollectionsPage