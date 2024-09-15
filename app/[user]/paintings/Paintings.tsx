
"use client"
// import { useState } from "react"
import { Loading } from "@/comps/Loading"
import { NotFound } from "@/comps/NotFound"
import { UsePaintings } from "./api/UsePainting"
import { Painting } from "@/comps/Links/PaintingLink"
// import { CollectionLink } from "@/comps/Links/CollectionLink"
import { ImageCreateForm } from "@/comps/Forms/ImageCreateForm"
// import { UseCollections } from "../collections/api/UseCollections"

export function PaintingsList({uploaderId}) {
  const paintingsRes = UsePaintings({ uploaderId })
  // const [showCollections, setShowCollections] = useState("all")
 
  function mutateAllUploads() {
   paintingsRes.mutate()
  //  collectionsRes.mutate()
  }
 
  return (
     <div className="flex flex-col items-center justify-center grow md:flex-row md:items-start m-4 p-4">
       <UploadForm mutateAllUploads={mutateAllUploads} showCollections={false} uploaderId={uploaderId} />
       <div className={"flex flex-col mx-4 w-11/12 md:w-2/3 mx-8"}>
         {/* <UploadsMenu setShowCollections={false}/> */}
         <UploadsList uploaderId={uploaderId} showCollections={false} paintingsRes={paintingsRes} collectionsRes={null} />
       </div>
     </div>
   )
}
 
function UploadForm({uploaderId, mutateAllUploads, showCollections}) {
  return <div className="w-11/12 md:w-1/3 my-4 md:my-10">
    <ImageCreateForm uploaderId={uploaderId} mutate={mutateAllUploads} isCollection={(showCollections=="collections") ? 1 : 0 }/>
  </div>
}

// function UploadsMenu({setShowCollections}) {
//   const activeBtnStyle = "focus:border-green-500 focus:border-b"
//   // const filterStates = ["all", "paintings", "collections"]
//   return (
//     <div className={"flex self-end gap-4 mx-10 mt-4 md:my-1 text-xs"}>
//       {filterStates.map((filter, idx) => <button className={activeBtnStyle} onClick={()=>setShowCollections(filter)}>{filter}</button> )}
//    </div>
//   )
// }

function UploadsList({uploaderId, showCollections, paintingsRes, collectionsRes}) {
  const paintings = paintingsRes && paintingsRes.data
  // const collections = collectionsRes && collectionsRes.data
  // const filteredPaintings = paintings && paintings.filter(data => !data.collectionId)

  if (paintingsRes.error) return <NotFound />
  if (paintingsRes.isLoading ) return <Loading />
  // if (paintingsRes.isValidating || collectionsRes.isValidating) return <Loading />

  if (paintings ) return (
    <div className="h-[480px] w-full flex flex-wrap justify-center overflow-auto">
    { paintings.map( art => <Painting key={art._id} positionIdx={art.positionIdx} mutate={paintingsRes.mutate} id={art._id} title={art.title} blob={art.blob} uploaderId={uploaderId} description={art.description} displayName={art.displayName} /> )}
   </div>
  )
}

