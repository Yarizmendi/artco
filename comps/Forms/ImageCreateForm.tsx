
"use client"
import { Input } from './FormInput'
import { ActionButton } from '../Buttons/ActionButton'
import { uploadImageAction } from 'actions/images/createImage'
import { useState } from 'react'
import Image from 'next/image'
 
interface ICreateForm {
  uploaderId: string,
  btnColor?: string,
  mutate?: any
}

export function ImageCreateForm({ uploaderId, btnColor="green", mutate } : ICreateForm ) {
  const [files, setFiles ] = useState(null)
  return (
    <form action={ async formData => {
      await uploadImageAction(formData)
      mutate()
      setFiles(null)
    }} className="flex flex-col gap-4 mt-2">
      <input type="hidden" name="uploaderId" defaultValue={uploaderId} />
      <Input title="title" placeholder={"title"} />
      <Input title="description" placeholder={"description"} />
      <Input title="displayName" placeholder={"display name"} />
      <div className='flex justify-between items-center'>
        <input className='text-xs' type="file" name="image" multiple={true} required onChange={ e => {
          e.preventDefault()
          const files = Array.from( e.target.files)
          const urls = files.map( file => URL.createObjectURL(file))
          setFiles( urls )
        }} />   
        <ActionButton idleTxt={"create"} loadingTxt='...creating' color={btnColor} btnType={"submit"}/>
      </div>
      { files &&  <div className='h-[280px] w-full my-2 flex flex-wrap gap-8 overflow-auto'>
        { files.map( (url, idx) => <Image className={"w-[100px] h-[100px]"} key={idx} src={url} width={100} height={100} alt={"img"} /> )}
      </div>}
    </form>
  )
}