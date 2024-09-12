
"use client"
import Image from "next/image"
import { CollectionDeleteIcon } from "../Buttons/ImageDeleteIcon"
import { Input } from "../Forms/FormInput"
import { useState } from "react"
import { ICONLINED } from "data/css"
import { updateCollectionAction } from "actions/images/updateImageAction"
import { ActionButton } from "../Buttons/ActionButton"
import Link from "next/link"

export function CollectionLink({ id, positionIdx, uploaderId, blob, title, description, displayName, images, mutate }) {
  const [isEditing, setIsEditing] = useState(false)

  return (
  <div className="p-4">

    <Link href={{
      pathname: `sketches/${id}-collection`,
      // query: { type: "collection" }
    }}
    replace={true}
    prefetch={false}>
      <Image 
        src= {blob} 
        alt={title} 
        width={ 300 }
        height={ 300 }
        quality={ 100 }
        className="w-fill h-[260px] md:w-[240px] md:h-[220px] rounded"
      />
    </Link>

    <form action={ async formData => {
      await updateCollectionAction( formData )
      mutate()
    }} className="w-full flex flex-col dark:bg-slate-950">
      <input name={"positionIdx"} defaultValue={positionIdx} />

      <div className="flex items-center dark:bg-slate-950">
        <span onClick={() => setIsEditing(!isEditing)} className={ICONLINED + " text-[20px] p-1 cursor-pointer" }>{ isEditing ? "cancel" : "edit" }</span>
        <Input title="title" value={title} placeholder="title"/>
      </div>

      { isEditing && 
        <div>
          <Input title="displayName" value={displayName} placeholder='display name'/>
          <Input title="blob" value={blob} placeholder='blob'/>
          <Input title="description" value={description} placeholder='description' />
          <div className="flex items-end justify-between p-2">
            <CollectionDeleteIcon id={id} uploaderId={uploaderId} blob={blob} mutate={mutate} images={images} />
            <ActionButton mutate={mutate} idleTxt={"update"} loadingTxt={"...updating"} color={"orange"} btnType={"submit"} />
          </div> 
        </div>
      }
    </form>

  </div>
  )
}
