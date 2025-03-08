
"use client"
import Image from "next/image"
import Link from "next/link"
import { ImageDeleteIcon } from "../Buttons/ImageDeleteIcon"
import { Input } from "../Forms/FormInput"
import { useState } from "react"
import { updateImageAction } from "actions/images/updateImageAction"
import { ActionButton } from "../Buttons/ActionButton"


interface IPainting {
  id: string,
  positionIdx: number,
  uploaderId: string,
  blob: string,
  title: string,
  description: string,
  displayName: string,
  mutate: any,
  type: "note" | "painting" | "noise" ,
  selected?: Array<IPainting>,
  setSelected?: any,
  isSelecting?: string
}

export function Painting({ 
  id, 
  positionIdx, 
  uploaderId, 
  blob, 
  title,
  description, 
  displayName, 
  mutate, 
  selected, 
  type,
  setSelected, 
  isSelecting 
}: IPainting ) {
  
  const [isEditing, setIsEditing] = useState(false)

  // const selectionHandler = () => {
  //   const selection = { id, title, blob }
  //   console.log(selection)
  //   selected = selected ? selected : []
  //   selected.length && selected.find( s => s.id == id ) ? setSelected(selected.filter( s => s.id !== id )) : setSelected([...selected, selection])
  // }

  return (
  <div 
    className={`p-4  ${selected ? selected.find( s => s.id == id ) ? "border-2 border-orange-500" : "border-2 border-transparent" : ""}`}
    // onClick={selectionHandler} 
    >
      <Link 
        href={`paintings/${id}`} 
        replace={true}
        prefetch={false} > 
        <Image 
          src= {blob} 
          alt={title} 
          width={ 300 }
          height={ 300 }
          quality={ 100 }
          className="w-fill h-[260px] md:w-[240px] md:h-[220px] rounded" />
      </Link>

    <form 
      className="w-full flex flex-col dark:bg-slate-950"
      action={ async formData => {
        await updateImageAction( formData )
        mutate()
      }}>
    
      <input name={"id"} defaultValue={id} hidden />

      <div className="flex items-center dark:bg-slate-950">
        <span onClick={() => setIsEditing(!isEditing)} className={"material-symbols-outlined text-[20px] p-1 cursor-pointer" }>{ isEditing ? "cancel" : "edit" }</span>
        <Input title="title" value={title} placeholder="title"/>
      </div>

      { isEditing && 
        <div>
          <Input title="positionIdx" value={positionIdx} placeholder='position' required={false} />
          <Input title="description" value={description} placeholder='description' required={false} />
          <Input title="displayName" value={displayName} placeholder='display name'/>

          <select defaultValue={type}
            className='text-sm font-light flex w-full dark:bg-slate-950 bg-slate-200 px-2 py-1 rounded w-full'
            name="type" id="type" >
            <option value="painting">painting</option>
            <option value="note">note</option>
            <option value="noise">noise</option>
          </select> 
          
          <div className="flex items-end justify-between p-2">
            <ImageDeleteIcon id={id} uploaderId={uploaderId} blob={blob} mutate={mutate} />
            <ActionButton mutate={mutate} idleTxt={"update"} loadingTxt={"...updating"} color={"orange"} btnType={"submit"} />
          </div> 
        </div>
      }
    </form>

  </div>
  )
}

