
"use client"
import { Loading } from "@/comps/Loading"
import { NotFound } from "@/comps/NotFound"
import { UseCollections } from "./api/UseCollections"
import { CollectionLink } from "@/comps/Links/CollectionLink"

export default function CollectionsList({ params }) {
  const uploaderId = params.user
  const { data, error, isLoading, isValidating, mutate } = UseCollections({ uploaderId })
  
  if ( error ) return <NotFound />
  if ( isLoading || isValidating ) return <Loading />

  if ( data ) return (
    <div className="mx-2 grow w-11/12 h-[550px] px-2 flex flex-wrap overflow-auto">
      { data.map( art => { 
        return <CollectionLink positionIdx={art.positionIdx} id={art._id} title={art.title} blob={art.blob} uploaderId={uploaderId} description={art.description} displayName={art.displayName} images={data} mutate={undefined} /> })}
   </div>
  )
}




  