

import classNames from 'classnames'
import { ICONLINED } from 'data/constants'
// @ts-ignore
import { useFormStatus } from 'react-dom'

export const ImageUpdateIcon = ({
   loadingTxt = "loading", 
   btnType = "submit", 
   iconName = "edit",
   art,
   svrAction
  }: {
    loadingTxt?: string,
    idleTxt?: string,
    color?: string,
    btnType?: any,
    iconName?: string,
    art: any,
    svrAction?: any
  }) => {

  const { pending } = useFormStatus()

  const actionBtnStyle = classNames(
    "rounded text-xs font-semibold cursor-pointer",
    // color == "orange" && "bg-oange-700 dark:bg-orange-800",
    // color == "blue" && "bg-blue-900",
    // color == "green" && "bg-green-900",
  )

  return (
    <div>
      <input hidden name={"imageId"} value={art.id} />
      <button disabled={pending} type={btnType} className={actionBtnStyle} onClick={svrAction}>
        { pending 
          ? loadingTxt
          : <span className={ICONLINED + " text-[20px] p-1" }>{iconName}</span>
        }
      </button>
    </div>
  )
}