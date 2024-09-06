
"use client"
import { Loading } from "@/comps/Loading"
import { NotFound } from "@/comps/NotFound"
import { UseCollections } from "./api/UseCollections"
import { ImageCreateForm } from "@/comps/Forms/ImageCreateForm"
import { CollectionLink } from "@/comps/Links/CollectionLink"

export function CollectionsList({ uploaderId }) {
  return (
     <div className="flex flex-col items-center justify-center grow md:flex-row md:items-start mt-8 px-4">
       <CollectionForm uploaderId={uploaderId} />
       <CollectionList uploaderId={uploaderId} />
     </div>
   )
 }
 
export function CollectionList({ uploaderId }) {
  const { data, error, isLoading, isValidating, mutate } = UseCollections({ uploaderId })
  if ( error ) return <NotFound />
  if ( isLoading || isValidating ) return <Loading />
  if ( data ) return (
    <div className="mx-8 w-11/12 md:w-2/3 h-[500px] flex flex-wrap justify-center overflow-auto">
    { data.map( art => <CollectionLink key={art._id} images={art.images} mutate={mutate} id={art._id} title={art.title} blob={art.blob} uploaderId={uploaderId} description={art.description} displayName={art.displayName} /> )}
   </div>
  )
}

function CollectionForm({ uploaderId }) {
  const { mutate } = UseCollections({ uploaderId })
  return <div className="w-10/12 mb-8 md:w-1/3">
    <ImageCreateForm uploaderId={uploaderId} mutate={mutate} isCollection={"1"} />
  </div>
}
