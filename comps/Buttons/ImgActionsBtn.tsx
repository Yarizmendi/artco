
'use client'
import classNames from 'classnames'
import { ICONLINED } from 'data/css'
import { useFormStatus } from 'react-dom'

export const ImgActionsBtn = ({
   loadingTxt = "loading", 
   color = "green",
   btnType = "submit", 
   iconName = "delete",
   imageId,
   vercelBlobUrl,
   uploaderId, 
   svrAction
  }: {
    loadingTxt?: string,
    idleTxt?: string,
    color?: string,
    btnType?: any,
    iconName?: string
    imageId: string
    vercelBlobUrl: string,
    uploaderId: string, 
    svrAction: any
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
      <input hidden name={"imageId"} value={imageId} />
      <input hidden name={"vercelBlobUrl"} value={vercelBlobUrl} />
      <input hidden name={"uploaderId"} value={uploaderId}  />
      <button disabled={pending} type={btnType} className={actionBtnStyle}>
        { pending 
          ? loadingTxt
          : <span className={ICONLINED + " text-[20px] p-1" }>{iconName}</span>
        }
      </button>
    </form>
  )
}