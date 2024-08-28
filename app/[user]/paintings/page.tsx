
import { Suspense } from "react"
import { Painting } from "@/comps/Links/PaintingLink"
import { getMongoImagesByUploaderId } from "actions/images/getImages"
import { SectionSkeleton } from "@/comps/Loading/SectionSkeleton"
import { ImageCreateForm } from "@/comps/Forms/ImageCreateForm"

export default function Paintings({ params }) {
  const uploaderId = params.user || "66bd62276d3999b70d5fd91b"
  return (
    <div className="flex flex-col items-center justify-center md:flex-row md:items-start grow mt-8 px-8 ">
      <div className="min-w-[400px] mt-4 mb-[20px] px-4 md:mt-1 md:mb-1 md:w-1/3">
        <input className="w-full dark:bg-slate-900 border-b dark:border-slate-100 border-slate-500 text-sm font-light my-4 py-2" type={"search"} placeholder={"Search artwork"} /> 
        <ImageCreateForm uploaderId={uploaderId} btnColor={"green"} /> 
      </div>
      <Suspense fallback={ <SectionSkeleton /> }>
        <ArtSuspense uploaderId={uploaderId} />
      </Suspense>
    </div>
  )
}

async function ArtSuspense({ uploaderId }) {
  const images = await getMongoImagesByUploaderId({ uploaderId })
  return (
    <div className="w-full md:w-2/3 h-[500px] flex flex-wrap justify-center overflow-auto">
      {
        images.map( art => {
          return <Painting key={art.id} id={art.id} title={art.title} blob={art.blob} uploaderId={uploaderId} description={art.description} displayName={art.displayName} />
        })
      }
    </div>
  )
}



