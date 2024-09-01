
"use client"
import { Loading } from "@/comps/Loading"
import { NotFound } from "@/comps/NotFound"
import { UseSketches } from "./api/UseSketches"
import SketchLink from "@/comps/Links/SketchLink"

export function SketchesList({ creatorId }) {
  const { data, error, isLoading, isValidating, mutate } = UseSketches({ creatorId })
  
  if ( error ) return <NotFound />
  if ( isLoading || isValidating ) return <Loading />

  if ( data ) return (
    <div className="mx-4 w-11/12 md:w-2/3 h-[550px] px-2 flex flex-wrap overflow-auto justify-center">
      { data.map( art => { 
        return <SketchLink 
          id={art._id} 
          key={art._id} 

          tags={art.tags} 
          images={art.images}
          inputs={art.inputs}
          textures={art.textures}

          vert={art.vert}
          frag={art.frag}
          blob={art.blob} 
          title={art.title} 

          displayName={art.displayName} 
          description={art.description}
    
          mutate={mutate}

        /> })}
   </div>
  )
}




  