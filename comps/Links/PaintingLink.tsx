
"use client"
import Image from "next/image"
import { ImageDeleteIcon } from "../Buttons/ImageDeleteIcon"
import { deleteImageAction } from "actions/images/deleteImageAction"
import { Input } from "../Forms/FormInput"
import { useState } from "react"
import { ICONLINED } from "data/css"
import { updateImageAction } from "actions/images/updateImageAction"
import { ActionButton } from "../Buttons/ActionButton"
import Link from "next/link"

export function Painting({ id, blob, title, uploaderId, description, displayName }) {
  const [isEditing, setIsEditing] = useState(false)

  return (
  <div className="transform duration-400 ease-in-out p-4">
    <Link href={`sketches/${title}`} prefetch={false}>
      <Image 
        src= {blob} 
        alt={title} 
        width={ 300 }
        height={ 300 }
        quality={ 100 }
        className="w-[340px] h-[300px] sm:w-[200px] sm:h-[200px] md:w-[240px] md:h-[230px] rounded"
      />
    </Link>

{ isEditing &&       <ImageDeleteIcon 
        id={id}
        blob={blob}
        uploaderId={uploaderId}
        color="red"
        loadingTxt="deleting"
        iconName="delete"
        svrAction={deleteImageAction} />}

    <form action={updateImageAction} className="w-full flex flex-col">
      <input hidden name={"id"} defaultValue={id} />
      <div className="flex items-center dark:bg-slate-950">
        <span onClick={() => setIsEditing(!isEditing)} className={ICONLINED + " text-[20px] p-1 cursor-pointer" }>{ isEditing ? "cancel" : "edit" }</span>
        <Input title="title" value={title} placeholder="title"/>
      </div>
      { isEditing && <div>
        <Input title="description" value={description} placeholder='description' />
        <Input title="displayName" value={displayName} placeholder='display name'/>
        <div className="flex items-center justify-end">
          <ActionButton idleTxt={"update"} loadingTxt={"...updating"} color={"orange"} btnType={"submit"} />
          {/* <ActionButton idleTxt={"cancel"} loadingTxt={"...updating"} color={"red"}  /> */}
        </div> 
      </div>}
    </form>

  </div>
  )
}

