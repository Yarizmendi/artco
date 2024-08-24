
'use client'
import { deleteImageAction } from 'actions/images/deleteImage'
import classNames from 'classnames'
import { ICONLINED } from 'data/css'
import { useFormStatus } from 'react-dom'

export const IconButton = ({
   loadingTxt = "loading", 
   idleTxt = "submit",
   color = "green",
   btnType = "submit", 
   iconName = "delete",
   imageId,
   vercelBlobUrl,
   uploaderId
  }: {
    loadingTxt?: string,
    idleTxt?: string,
    color?: string,
    btnType?: any,
    iconName?: string
    imageId: string
    vercelBlobUrl: string,
    uploaderId: string
  }) => {

  const { pending } = useFormStatus()

  const actionBtnStyle = classNames(
    "rounded text-xs font-semibold cursor-pointer",
    color == "red" && "bg-red-900",
    color == "blue" && "bg-blue-900",
    color == "green" && "bg-green-900",
  )

  return (
    <form className='absolute top-0 right-2 rounded-full text-white' action={deleteImageAction}>
      <input hidden name={"imageId"} value={imageId} />
      <input hidden name={"vercelBlobUrl"} value={vercelBlobUrl} />
      <input hidden name={"uploaderId"} value={uploaderId}  />
      <button disabled={pending} type={btnType} className={actionBtnStyle}>
        { pending 
          ? loadingTxt
          : <span className={ICONLINED + " text-[15px] p-1" }>{iconName}</span>
        }
      </button>
    </form>
  )
}