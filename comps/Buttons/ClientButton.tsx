
"use client"
import classNames from 'classnames'

export const ClientButton = ({
   dataId,
   actionFunct,
   color = "red",
   type = "button",
   idleTxt = "delete"
  }: {
    loadingTxt?: string,
    idleTxt?: string,
    color?: string,
    actionFunct?: any,
    dataId?: string,
    type?: any
  }) => {

  const actionBtnStyle = classNames(
    "my-2 px-4 py-2 text-slate-200",
    "rounded text-xs font-semibold",
    color == "red" && "bg-red-900",
    color == "blue" && "bg-blue-900",
    color == "green" && "bg-green-900",
    color == "orange" && "bg-orange-700",
  )

  return (
    <div>
      <button onClick={ e => {
        e.preventDefault()
        actionFunct(dataId)
      }}
      className={actionBtnStyle} type={type}>
        { idleTxt }
      </button>
    </div>
  )
}