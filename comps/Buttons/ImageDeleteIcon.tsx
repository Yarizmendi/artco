
'use client'
import { deleteCollectionAction, deleteImageAction } from 'actions/images/deleteImageAction'


export const ImageDeleteIcon = ({ id, blob, uploaderId, mutate }: { id?, uploaderId?,  blob?, mutate? }) => {
  return (
    <button className='text-slate-100 dark:text-slate-200 bg-red-500'
      onClick={ async e => {
        e.preventDefault()
        await deleteImageAction(id, blob, uploaderId)
        mutate()
      }}> 
      <span className={"material-symbols-outlined text-[16px] p-1" }>{"delete"}</span>
   </button>
  )
}

export const CollectionDeleteIcon = ({ id, uploaderId, images, mutate }: { id?, uploaderId?,  blob?, mutate?, images }) => {
  return (
    <button className='text-slate-100 dark:text-slate-200 bg-red-500'
      onClick={ async e => {
        e.preventDefault()
        await deleteCollectionAction({ id, images, uploaderId })
        mutate()
      }}> 
      <span className={"material-symbols-outlined text-[16px] p-1" }>{"delete"}</span>
   </button>
  )
}