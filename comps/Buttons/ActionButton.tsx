
'use client'
import classNames from 'classnames'
import { useFormStatus } from 'react-dom'

export const ActionButton = ({
   loadingTxt = "loading", 
   idleTxt = "submit",
   color = "green",
   btnType = "submit", 
   action,
  }: {
    loadingTxt?: string,
    idleTxt?: string,
    color?: string,
    btnType?: any,
    action?: any
  }) => {

  const { pending } = useFormStatus()

  const actionBtnStyle = classNames(
    "my-2 px-4 py-2",
    "rounded text-xs text-slate-100 font-semibold",
    color == "red" && "bg-red-900",
    color == "blue" && "bg-blue-900",
    color == "green" && "bg-green-900",
    color == "orange" && "dark:bg-orange-800 bg-orange-700",
  )

  return (
    <div>
      <button 
        disabled={pending}
         type={btnType}
          className={actionBtnStyle}>
        { pending ? loadingTxt : idleTxt }
      </button>
    </div>
  )
}