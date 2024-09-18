
"use client"
import { Loading } from "@/comps/Loading"
import { NotFound } from "@/comps/NotFound"
import { UseCollections } from "./api/UseCollections"
import { CollectionLink } from "@/comps/Links/CollectionLink"
import { ImageCreateForm } from "@/comps/Forms/ImageCreateForm"


export function CollectionsList({uploaderId}) {
  const collectionsRes = UseCollections({ uploaderId })
 
  function mutateAllUploads() {
   collectionsRes.mutate()
  }
 
  return (
     <div className="flex flex-col items-center justify-center grow md:flex-row md:items-start m-4 p-4">
       <UploadForm mutateAllUploads={mutateAllUploads} uploaderId={uploaderId} />
       <div className={"flex flex-col mx-4 w-11/12 md:w-2/3 mx-8"}>
         <UploadsList uploaderId={uploaderId} collectionsRes={collectionsRes} />
       </div>
     </div>
   )
}
 
function UploadForm({uploaderId, mutateAllUploads }) {
  return <div className="w-11/12 md:w-1/3 my-4 md:my-10">
    <ImageCreateForm uploaderId={uploaderId} mutate={mutateAllUploads} isCollection={1}/>
  </div>
}

function UploadsList({uploaderId, collectionsRes}) {
    if (collectionsRes.error) return <NotFound />
    if (collectionsRes.isLoading ) return <Loading />
    if (collectionsRes) return (
      <div className="h-[480px] w-full flex flex-wrap justify-center overflow-auto">
      {collectionsRes.data.map( (art, i) => <CollectionLink key={art._id} mutate={collectionsRes.mutate} id={art._id} title={art.title} blob={art.blob} uploaderId={uploaderId} description={art.description} displayName={art.displayName} images={collectionsRes.data} positionIdx={i} /> )}
     </div>
    )
  }
  

