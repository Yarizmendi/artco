
"use client"
import { Painting } from "@/comps/Links/PaintingLink"
import { Loading } from "@/comps/Loading"
import { NotFound } from "@/comps/NotFound"
import { UsePaintings } from "./api/UsePainting"
import { ImageCreateForm } from "@/comps/Forms/ImageCreateForm"

export function PaintingsList({ uploaderId }) {
 return (
    <div className="flex flex-col items-center justify-center grow md:flex-row md:items-start mt-8 px-4">
      <PaintForm uploaderId={uploaderId} />
      <PaintList uploaderId={uploaderId} />
    </div>
  )
}

function PaintList({ uploaderId }) {
  const { data, error, isLoading, isValidating, mutate } = UsePaintings()
  if ( error ) return <NotFound />
  if ( isLoading || isValidating ) return <Loading />
  if ( data ) return (
    <div className=" mx-8 w-11/12 md:w-2/3 h-[500px] flex flex-wrap justify-center overflow-auto">
    { data.map( art => <Painting key={art._id} mutate={mutate} id={art._id} title={art.title} blob={art.blob} uploaderId={uploaderId} description={art.description} displayName={art.displayName} /> )}
   </div>
  )
}

function PaintForm({ uploaderId }) {
  const { mutate } = UsePaintings()
  return <div className="min-w-1/3 md:w-1/3">
    <ImageCreateForm uploaderId={uploaderId} mutate={mutate} />
  </div>
}



  