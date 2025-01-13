
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
   <div className="w-full h-full flex flex-col items-center justify-center md:flex-row md:items-start m-2 p-2 gap-2">
    <div className="w-10/12 md:min-w-1/2 h-[550px] flex justify-center flex-wrap overflow-auto  md:m-8">
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
    </div>
  
  )
}




  