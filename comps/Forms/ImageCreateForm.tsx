
"use client"
import Image from 'next/image'
import { useState } from 'react'
import { Input } from './FormInput'
import { ActionButton } from '../Buttons/ActionButton'
import { uploadImageAction } from 'actions/images/createImage'
 
interface ICreateForm {
  uploaderId: string,
  btnColor?: string,
  mutate?: any,
  isCollection?: any,
}

export function ImageCreateForm({ uploaderId, btnColor="green", mutate, isCollection } : ICreateForm ) {
  const [files, setFiles ] = useState(null)
  return (
    <form className="flex flex-col gap-4"
      action={ async formData => {
        await uploadImageAction(formData)
        mutate()
        setFiles(null)
    }}>
      <input type="hidden" name="uploaderId" defaultValue={uploaderId} />
      <input type="hidden" name="isCollection" defaultValue={isCollection} />
      <Input title="title" placeholder={"title"} />
      <Input title="description" placeholder={"description"} />
      <Input title="displayName" placeholder={"display name"} />
      { files && <div className='h-[280px] w-full my-2 flex flex-wrap gap-8 overflow-auto'>
        { files.map( (url, idx) => <Image className={"w-[100px] h-[100px]"} key={idx} src={url} width={100} height={100} alt={"img"} /> )}
      </div>}
    </form>
  )
}