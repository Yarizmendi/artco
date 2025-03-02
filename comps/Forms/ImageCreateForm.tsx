
"use client"
import Image from 'next/image'
import { useState } from 'react'
import { Input } from './FormInput'
import { ShaderSelect } from "./ImageSelect"
import { ActionButton } from '../Buttons/ActionButton'
import { uploadImageAction } from 'actions/images/createImage'
 
interface ICreateForm {
  uploaderId: string,
  btnColor?: string,
  mutate?: any,
  isCollection?: string,
  selection?: any
}

export function ImageCreateForm({ uploaderId, btnColor="green", mutate, isCollection, selection } : ICreateForm ) {
  const [songs, setSongs] = useState(null)
  const [images, setImages] = useState(null)
  const [shaders, setShaders] = useState(null)
  return (
    <form className="flex flex-col gap-4"
      action={ async formData => {
        await uploadImageAction(formData, selection)
        mutate()
        setImages(null)
    }}>
      <input type="hidden" name="uploaderId" defaultValue={uploaderId} />
      <input type="hidden" name="isCollection" defaultValue={isCollection} />
      <Input title="title" placeholder={"title"} />
      <Input title="description" placeholder={"description"} />
      <Input title="displayName" placeholder={"display name"} />
      {/* <ShaderSelect /> */}
      <div className='flex justify-between items-center'>
        <input className='text-[10px] file:p-1 font-normal file:mr-4 file:text-xs' type="file" name="image" multiple={true} onChange={ e => {
          e.preventDefault()
          const files = Array.from( e.target.files)
          const urls = files.map( file => URL.createObjectURL(file))
          setImages( urls )
        }} />   
        <ActionButton idleTxt={"create"} loadingTxt='...creating' color={btnColor} btnType={"submit"}/>
      </div>
      { images && <div className='h-[280px] w-full my-2 flex flex-wrap gap-8 overflow-auto'>
        { images.map( (url, idx) => <Image className={"w-[100px] h-[100px]"} key={idx} src={url} width={100} height={100} alt={"img"} /> )}
      </div>}
    </form>
  )
}