
"use client"
import { Loading } from "@/comps/Loading"
import { NotFound } from "@/comps/NotFound"
import { UsePaintings } from "./api/UsePainting"
import { Painting } from "@/comps/Links/PaintingLink"
import { ImageCreateForm } from "@/comps/Forms/ImageCreateForm"

export function PaintingsList({uploaderId}) {
  const paintingsRes = UsePaintings({ uploaderId })
 
  function mutateAllUploads() {
   paintingsRes.mutate()
  }
 
  return (
     <div className="flex flex-col items-center justify-center grow md:flex-row md:items-start m-4 p-4">
       <UploadForm mutateAllUploads={mutateAllUploads} uploaderId={uploaderId} />
       <div className={"flex flex-col mx-4 w-11/12 md:w-2/3 mx-8"}>
         <UploadsList uploaderId={uploaderId} paintingsRes={paintingsRes} />
       </div>
     </div>
   )
}
 
function UploadForm({uploaderId, mutateAllUploads }) {
  return <div className="w-11/12 md:w-1/3 my-4 md:my-10">
    <ImageCreateForm uploaderId={uploaderId} mutate={mutateAllUploads} isCollection={0}/>
  </div>
}

function UploadsList({uploaderId, paintingsRes}) {
  const paintings = paintingsRes && paintingsRes.data
  if (paintingsRes.error) return <NotFound />
  if (paintingsRes.isLoading ) return <Loading />
  if (paintings ) return (
    <div className="h-[480px] w-full flex flex-wrap justify-center overflow-auto">
    { paintings.map( art => <Painting key={art._id} positionIdx={art.positionIdx} mutate={paintingsRes.mutate} id={art._id} title={art.title} blob={art.blob} uploaderId={uploaderId} description={art.description} displayName={art.displayName} /> )}
   </div>
  )
}

