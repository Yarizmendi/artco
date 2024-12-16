
"use client"
import { Loading } from "@/comps/Loading"
import { NotFound } from "@/comps/NotFound"
import { UsePaintings } from "./api/UsePainting"
import { Painting } from "@/comps/Links/PaintingLink"
import { ImageCreateForm } from "@/comps/Forms/ImageCreateForm"

export function PaintingsList({ uploaderId }) {
  const paintingsRes = UsePaintings({ uploaderId })
  const paintings = paintingsRes && paintingsRes.data
 
  function mutateAllUploads() {
    paintingsRes.mutate()
  }

  if ( paintingsRes.error ) return <NotFound />
  if ( paintingsRes.isLoading ) return <Loading />
 
  return (
    <div className="w-full h-full flex flex-col items-center justify-center md:flex-row md:items-start m-2 p-2 gap-2">

      <div className="w-11/12 md:w-1/3 my-4 md:my-10">
        <ImageCreateForm uploaderId={uploaderId} mutate={mutateAllUploads} isCollection={0} />
      </div>

      <div className="w-11/12 md:w-2/3 h-[500px] md:h-vh flex flex-wrap overflow-auto">
        { paintings && paintings.map( art => {
          return <Painting 
            key={art._id} 
            positionIdx={art.positionIdx} 
            mutate={paintingsRes.mutate} 
            id={art._id} 
            title={art.title}
            blob={art.blob} 
            uploaderId={uploaderId} 
            description={art.description} 
            displayName={art.displayName}  /> })}
      </div>

    </div>
  )
}
