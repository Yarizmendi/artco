

"use client"
import { Loading } from "@/comps/Loading"
import { NotFound } from "@/comps/NotFound"
import { UseCollections } from "../../../api/collections/UseCollections"
import { ImageCreateForm } from "@/comps/Forms/ImageCreateForm"
import Collection from "./Collection"

export function CollectionList({ uploaderId }) {
  const collectionsRes = UseCollections()
  const collections = collectionsRes && collectionsRes.data
  console.log(collections)
 
  function mutateAllUploads() {
    collectionsRes.mutate()
  }

  if ( collectionsRes.error ) return <NotFound />
  if ( collectionsRes.isLoading ) return <Loading />
 
  return (
    <div className="w-full h-full flex flex-col items-center justify-center md:flex-row md:items-start m-2 p-2 gap-2">

      {/* <div>
        <button onClick={() => setIsSelecting(!isSelecting)} className="p-2 bg-slate-200 dark:bg-slate-800 rounded"> {isSelecting ? "cancel" : "select"} </button>
      </div> */}

      <div className="w-11/12 md:w-1/3 my-4 md:my-10">
        <ImageCreateForm uploaderId={uploaderId} mutate={mutateAllUploads} selection={[]} isCollection="0" />
      </div>

      <div className="w-11/12 md:w-2/3 h-[500px] md:h-vh flex flex-wrap overflow-auto">
        { collections && collections.map( art => {
          return <Collection 
            key={art._id} 
            // positionIdx={art.positionIdx} 
            // mutate={collectionsRes.mutate} 
            id={art._id} 
            title={art.title}
            blob={art.blob} 
            // uploaderId={uploaderId} 
            // description={art.description} 
            // displayName={art.displayName}
              /> })}
      </div>

    </div>
  )
}
