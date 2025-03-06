
"use client"

import { UsePaintings } from "@/api/vercel/paintings/UsePaintings"
import { Painting } from "@/comps/Links/PaintingLink"
import { Loading } from "@/comps/Loading"
import { NotFound } from "@/comps/NotFound"

export default function PaintingsList({ uploaderId }) {
  const { data, error, isLoading, isValidating, mutate } = UsePaintings({ uploaderId })

  if ( error ) return <NotFound />
  if ( isLoading || isValidating ) return <Loading />

  if ( data ) return (
    <div className="w-full">
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
  )
    
}