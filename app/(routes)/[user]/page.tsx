
import Link from "next/link"
import Image from "next/image"

// const collections = [
//   { title: "uploads", id: 2, path: "/paintings", blob: "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/alice_falls.webp" },
//   { title: "tests", id: 0, path: "/sketches/tests", blob: "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/ballerina.png" },
//   { title: "sketches", id: 1, path: "/sketches", blob: "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/industrial_ocean.jpg" },
//   { title: "sketches", id: 3, path: "/collections", blob: "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/window.jpg" },
// ]

export default function ArtistPage({ params }) {
  const defaultUser = "66bd62276d3999b70d5fd91b"
  return (
      <div className="w-full h-full flex flex-col items-center justify-center md:flex-row md:items-start m-2 p-2 gap-2">

      {/* <div className={"flex flex-wrap items-center overflow-auto justify-center md:justify-start m-4 md:m-8"}> */}
      {/* { collections.map(({ title, path, blob }, key ) =>
        <Link 
          href={params.user || defaultUser + path} 
          className={"p-2 m-2"}
          key={key}>
          <Image 
            src={blob} 
            alt={title} 
            width={600} 
            height={500} 
            className={"max-w-[320px] h-[320px]"} />
            <p className="w-full dark:bg-slate-950 bg-gray-300 p-2 text-3xl">{title.toUpperCase()}</p>
        </Link> )}  */}
      {/* </div> */}
    </div>
  )
}
