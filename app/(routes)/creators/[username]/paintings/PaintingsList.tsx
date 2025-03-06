
"use client"

import { UsePaintings } from "@/api/vercel/paintings/UsePaintings"
import { ImageCreateForm } from "@/comps/Forms/ImageCreateForm"
import { Painting } from "@/comps/Links/PaintingLink"
import { Loading } from "@/comps/Loading"
import { NotFound } from "@/comps/NotFound"

export default function PaintingsList({ uploaderId }) {
  const { data, error, isLoading, isValidating, mutate } = UsePaintings({ uploaderId })

  if ( error ) return <NotFound />
  if ( isLoading || isValidating ) return <Loading />

  if ( data ) return (
    <div className="w-full h-full flex flex-col items-center justify-center md:flex-row md:items-start m-2 p-2 gap-2">

      <div className="w-11/12 md:w-1/3 my-4 md:my-10">
        <ImageCreateForm uploaderId={uploaderId} mutate={mutate} selection={[]} isCollection="0" />
      </div>

      <div className="w-11/12 md:w-2/3 h-[500px] md:h-vh flex flex-wrap overflow-auto">
        {data.map((art) => {
            return <Painting 
                key={art._id} 
                positionIdx={art.positionIdx} 
                mutate={mutate} 
                id={art._id} 
                title={art.title}
                blob={art.blob} 
                uploaderId={uploaderId} 
                description={art.description} 
                displayName={art.displayName}  /> 
        })}
        </div>
    </div>
  )
    
}