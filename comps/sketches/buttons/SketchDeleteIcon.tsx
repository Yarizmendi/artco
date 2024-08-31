
'use client'

import { deleteSketchAction } from 'actions/sketches/deleteSketchAction'
import { ICONLINED } from 'data/css'

export const SketchDeleteIcon = ({ id, mutate }: { id?, blob?, mutate? }) => {
  return (
    <button className='text-slate-100 dark:text-slate-200 bg-red-500'
      onClick={ async e => {
        e.preventDefault()
        await deleteSketchAction(id)
        mutate()
      }}> 
      <span className={ICONLINED + " text-[16px] p-1" }>{"delete"}</span>
   </button>
  )
}