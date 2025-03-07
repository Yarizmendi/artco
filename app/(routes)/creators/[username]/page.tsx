
import Link from "next/link"
import Image from "next/image"

const routes = [
    { title: "paintings", path: "/paintings", blob: "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/paintings/alice_falls.webp" },
    { title: "notes", path: "/notes", blob: "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/paintings/preview5750.png" },
    { title: "sketches", path: "/sketches", blob: "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/paintings/ballerina.png" },
]

export default function ArtistPage({ params }) {
  const username = params.username
  return (
      <div className="w-full h-full flex flex-col items-center justify-center md:flex-row md:items-start m-2 p-2 gap-2">
        <div className={"flex flex-wrap items-center overflow-auto justify-center md:justify-start m-4 md:m-8"}>
        { routes.map(({ title, path, blob }, key ) =>
            <Link 
            href={username + path} 
            className={"p-2 m-2"}
            key={key}>
            <Image 
                src={blob} 
                alt={title} 
                width={600} 
                height={500} 
                className={"max-w-[320px] h-[320px]"} />
                <p className="w-full dark:bg-slate-950 bg-gray-300 p-2 text-3xl">{title.toUpperCase()}</p>
            </Link> )} 
        </div>
    </div>
  )
}