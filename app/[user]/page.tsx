
import Link from "next/link"
import Image from "next/image"

const collections = [
  { title: "uploads", id: 2, path: "/paintings", blob: "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/alice_falls.webp" },
  { title: "tests", id: 0, path: "/sketches/tests", blob: "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/ballerina.png" },
  { title: "sketches", id: 0, path: "/sketches", blob: "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/industrial_ocean.jpg" },
]

export default function ArtistPage({ params }) {
  const defaultUser = "66bd62276d3999b70d5fd91b"
  return (
    <div>
      <div className={"flex flex-wrap items-center overflow-auto justify-center md:justify-start"}>
      { collections.map(({ title, path, blob }, key ) =>
        <Link 
          href={params.user || defaultUser + path} 
          className={"p-2 m-2"}
          key={key}>
          <Image 
            src={blob} 
            alt={title} 
            width={600} 
            height={500} 
            className={"max-w-[350px] h-[350px]"} />
            <p className="w-full dark:bg-slate-950 bg-gray-300 p-2 text-3xl">{title.toUpperCase()}</p>
        </Link> )} 
      </div>
    </div>
  )
}
