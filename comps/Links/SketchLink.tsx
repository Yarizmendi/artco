
'use client'
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { updateSketchAction } from "actions/sketches/updateSketchAction"
import { ICONLINED } from "data/css"
import { ActionButton } from "../Buttons/ActionButton"
import { Input } from "../Forms/FormInput"
import { SketchDeleteIcon } from "../sketches/buttons/SketchDeleteIcon"

export default function SketchLink({ 
  id, vert, frag, 
  description, blob, title, displayName,
  tags, images, inputs, textures,
  mutate

 }) {

  const [isEditing, setIsEditing] = useState(false)

  return (
    <div className="px-4 pb-4">
      <Link href={{
      pathname: `sketches/${id}`,
    }} 
    replace={true}
    prefetch={false}
    >
        <Image 
          src={blob} 
          alt={title} 
          width={300}
          height={300}
          quality={100}
          className="min-w-[300px] h-[300px] sm:min-w-[200px] sm:h-[200px] md:w-[250px] md:h-[230px] rounded" />
      </Link>
  
      <form className="w-full flex flex-col dark:bg-slate-950 bg-slate-200" 
        action={ async formData => {
          await updateSketchAction( formData )
          mutate()
        }}>
        <input name={"id"} defaultValue={id} hidden />

        <div className="flex items-center bg-slate-200 dark:bg-slate-950">
          <span onClick={() => setIsEditing(!isEditing)} className={ICONLINED + " text-[20px] p-1 cursor-pointer" }>{ isEditing ? "cancel" : "edit" }</span>
          <Input title="title" value={title} placeholder="title"/>
        </div>
  
        { isEditing && 
          <div className="flex flex-col mt-2 gap-2 dark:bg-slate-950">
            <Input title="frag" value={frag} placeholder='frag' />
            <Input title="description" value={description} placeholder='description' required={false} />
            <Input title="displayName" value={displayName} placeholder='display name'/>

            {/* <Datalist title={"tags"} dataArr={tags.meta} /> */}
            {/* <Datalist title={"images"} dataArr={images} /> */}
            {/* <Datalist title={"inputs"} dataArr={inputs} /> */}
            {/* <Datalist title={"textures"} dataArr={textures} /> */}

            <div className="flex items-end justify-between p-2 dark:bg-slate-950 bg-slate-100">
              <SketchDeleteIcon id={id} mutate={mutate} />
              <ActionButton mutate={mutate} idleTxt={"update"} loadingTxt={"...updating"} color={"orange"} btnType={"submit"} />
            </div> 

          </div>
        }
      </form>
    </div>

    )
  }
  
  

