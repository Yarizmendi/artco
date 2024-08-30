
'use client'
import { deleteImageAction } from 'actions/images/deleteImageAction'
import { ICONLINED } from 'data/css'

export const ImageDeleteIcon = ({ id, blob, uploaderId, mutate }: { id?, uploaderId?,  blob?, mutate? }) => {
  return (
    <button className='text-slate-100 dark:text-slate-200 bg-red-500'
      onClick={ async e => {
        e.preventDefault()
        await deleteImageAction(id, blob, uploaderId)
        mutate()
      }}> 
      <span className={ICONLINED + " text-[16px] p-1" }>{"delete"}</span>
   </button>
  )
}