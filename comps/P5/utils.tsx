


import { colors } from "@/comps/Tags/tag"
import { getRandomElement } from "actions/utils"
import classnames from "classnames"

export function RandomBorder (size="m") {
  const randColor = getRandomElement(colors)
  const color = classnames(
    `border-${randColor}-500`, {
    "border": size == "s",
    "border-2": size == "m",
    "border-4": size == "l",
  })
  return color
}

export const boxClass = classnames(
    "text-sm bg-slate-950",
    "min-w-[40px] min-h-[20px]",
    "max-w-[60px] max-h-[40px]",
    "border rounded cursor-pointer",
    "flex items-center justify-center"
  )
  

 export const flexCenter = classnames("flex justify-center items-center")

   