
"use client"
import { Painting } from "@/comps/Links/PaintingLink"
import { Loading } from "@/comps/Loading"
import { NotFound } from "@/comps/NotFound"
import { UsePaintings } from "./api/UsePainting"
import { ImageCreateForm } from "@/comps/Forms/ImageCreateForm"
import { uploadImageAction } from "actions/images/createImage"
import { useState } from "react"
import { shuffleArray } from "actions/utils"

export function PaintingsList({ uploaderId }) {
 const [showCollections, setShowCollections] = useState("all")
 return (
    <div className="flex flex-col items-center justify-center grow md:flex-row md:items-start mt-8 px-4">
      <PaintForm uploaderId={uploaderId} />
      <div className={"flex flex-col mx-8 w-11/12 md:w-2/3"}>
        <div className={"flex self-end gap-4 mr-14 mx-2 text-xs"}>
          <button onClick={()=>setShowCollections("all")}>all</button>
          <button onClick={()=>setShowCollections("paintings")}>paintings</button>
          <button onClick={()=>setShowCollections("collections")}>collections</button>
        </div>
        <PaintList uploaderId={uploaderId} showCollections={showCollections} />
      </div>
    </div>
  )
}

function PaintList({ uploaderId, showCollections }) {
  const {data, error, isLoading, isValidating, mutate} = UsePaintings({ uploaderId })
  const singles = data && shuffleArray(data.filter(data => !data.collectionId))
  const collections = data && shuffleArray(data.filter(data => data.collectionId))
  const all = data && shuffleArray(data)

  if ( error ) return <NotFound />
  if ( isLoading || isValidating ) return <Loading />

  if ( data ) return (
    <div className="h-[500px] flex flex-wrap justify-center overflow-auto">
    { showCollections == "all" && all.map( art => <Painting key={art._id} mutate={mutate} id={art._id} title={art.title} blob={art.blob} uploaderId={uploaderId} description={art.description} displayName={art.displayName} /> )}
    { showCollections == "paintings" && singles.map( art => <Painting key={art._id} mutate={mutate} id={art._id} title={art.title} blob={art.blob} uploaderId={uploaderId} description={art.description} displayName={art.displayName} /> )}
    { showCollections == "collections" && collections.map( art => <Painting key={art._id} mutate={mutate} id={art._id} title={art.title} blob={art.blob} uploaderId={uploaderId} description={art.description} displayName={art.displayName} /> )}
   </div>
  )
}

function PaintForm({ uploaderId }) {
  const { mutate } = UsePaintings({ uploaderId })
  return <div className="w-10/12 mb-8 md:w-1/3">
    <ImageCreateForm uploaderId={uploaderId} mutate={mutate} actionFunction={uploadImageAction} isCollection={0}/>
  </div>
}



  