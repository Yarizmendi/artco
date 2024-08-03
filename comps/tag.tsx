import { getRandomElement } from "actions/utils"
import classnames from "classnames"

interface ITagUi {
  color?: string
  title?: string
  size?: string
}

export const Dot = ({ color }) => 
  <span 
    className={classnames(
    "m-1 h-[10px] w-[10px]", 
    "rounded-full shadow-inner", {
    "bg-green-400": color === "green",
    "bg-blue-400": color === "blue",
    "bg-red-400": color === "red",
    "bg-purple-400": color === "purple",
    "bg-yellow-400": color === "yellow",
    "bg-orange-400": color === "orange",
    "bg-stone-400": color === "stone",
  })} />

  const colors: string[] = [
    "green", "blue", "red", "purple", "yellow", "orange", "stone"
  ]


export const Tag = ({ color, title, size = "small" }: ITagUi ) => {

  color = color || getRandomElement( colors )
  

  const sizeClasses = {
    small: "pl-1 pr-2",
    medium: "pl-2 pr-3 py-1 border-b",
    large: "pl-3 pr-4 py-2 border-b-2",
  }

  const colorClasses = {
    green: "bg-green-100 border-green-400",
    blue: "bg-blue-100 border-blue-400",
    red: "bg-red-100 border-red-400",
    purple: "bg-purple-100 border-purple-400",
    yellow: "bg-yellow-100 border-yellow-400",
    orange: "bg-orange-100 border-orange-400",
    stone: "bg-stone-100 border-stone-400",
  }

  return (
    <div
      className={classnames(
        "w-fit",
        "flex items-center",
        "rounded-full",
        "shadow-sm",
        sizeClasses[size],
        colorClasses[color]
      )}>
      <Dot color={color} />
      <p 
        className={classnames(
          "text-xs text-black font-semibold", 
          "max-h-[15px] overflow-hidden"
        )}>
        {title}
      </p>
    </div>
  )
}

export default Tag;