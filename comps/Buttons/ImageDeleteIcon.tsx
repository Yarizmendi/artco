
'use client'
import classNames from 'classnames'
import { ICONLINED } from 'data/css'
import { useFormStatus } from 'react-dom'

export const ImageDeleteIcon = ({
   loadingTxt = "loading", 
   color = "green",
   btnType = "submit", 
   iconName = "delete",
   svrAction, 
   id, blob, uploaderId
  }: {
    loadingTxt?: string,
    idleTxt?: string,
    color?: string,
    btnType?: any,
    iconName?: string,
    svrAction?: any, 
    art?: any,
    id?, blob?, uploaderId
  }) => {

  const { pending } = useFormStatus()

  const actionBtnStyle = classNames(
    "rounded text-xs font-semibold cursor-pointer",
    color == "red" && "bg-red-700 dark:bg-red-800",
    color == "blue" && "bg-blue-900",
    color == "green" && "bg-green-900",
  )

  return (
    <form className='absolute top-0 right-2 rounded-full text-slate-100 dark:text-slate-200' action={svrAction}>
      <input hidden name={"imageId"} defaultValue={id} />
      <input hidden name={"vercelBlobUrl"} value={blob} />
      <input hidden name={"uploaderId"} value={uploaderId} />
      <button disabled={pending} type={btnType} className={actionBtnStyle}>
        { pending 
          ? loadingTxt
          : <span className={ICONLINED + " text-[20px] p-1" }>{iconName}</span>
        }
      </button>
    </form>
  )
}