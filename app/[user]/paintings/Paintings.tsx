
"use client"
import { Painting } from "@/comps/Links/PaintingLink"
import { Loading } from "@/comps/Loading"
import { NotFound } from "@/comps/NotFound"
import { UsePaintings } from "./api/UsePainting"

export function PaintingsList({ uploaderId }) {
  const { data, error, isLoading } = UsePaintings()
  if ( error ) return <NotFound />
  if ( isLoading ) return <Loading />
  if ( data ) return (
    <div className="w-11/12 md:w-2/3 h-[500px] flex flex-wrap justify-center overflow-auto mx-8">
      { data.map( art => <Painting key={art.id} id={art.id} title={art.title} blob={art.blob} uploaderId={uploaderId} description={art.description} displayName={art.displayName} /> )}
    </div>
  )
}



  