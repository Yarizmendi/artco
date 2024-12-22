
'use client'
import classNames from 'classnames'
import { useFormStatus } from 'react-dom'

export const ActionButton = ({
   loadingTxt = "loading", 
   idleTxt = "submit",
   color = "green",
   btnType = "submit", 
   mutate
  }: {
    loadingTxt?: string,
    idleTxt?: string,
    color?: string,
    btnType?: any,
    action?: any,
    mutate?
  }) => {

  const { pending } = useFormStatus()

  const actionBtnStyle = classNames(
    "px-4 py-2 w-fit",
    "rounded text-xs text-slate-100 font-semibold",
    color == "red" && "bg-red-900",
    color == "blue" && "bg-blue-900",
    color == "green" && "bg-green-900",
    color == "orange" && "bg-orange-700",
  )

  return (
    <button className={actionBtnStyle}
      disabled={pending} type={btnType}>
      { pending ? loadingTxt : idleTxt }
    </button>
  )
}