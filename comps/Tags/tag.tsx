import { getRandomElement } from "actions/utils"
import classnames from "classnames"

interface ITagUi {
  color?: string
  title?: string
  size?: string
  style?: string
}


  export const colors: string[] = [
    "green", "blue", "red", "purple", "yellow", "orange", "stone"
  ]

  export const Dot = ({ color }) => 
    <span 
      className={classnames(
      "m-1 h-[10px] w-[10px]", 
      "rounded-full shadow-inner", {
      "bg-green-500": color === "green",
      "bg-blue-500": color === "blue",
      "bg-red-500": color === "red",
      "bg-purple-500": color === "purple",
      "bg-yellow-500": color === "yellow",
      "bg-orange-500": color === "orange",
      "bg-stone-500": color === "stone",
    })} />
  

export const Tag = ({ color, title, size = "small", style="outlined" }: ITagUi ) => {

  color = color || getRandomElement( colors )
  
  const sizeClasses = {
    small: "pl-2 pr-[5px] border-b",
    medium: "pl-2 pr-3 py-1 border-b",
    large: "pl-3 pr-4 py-2 border-b-2",
  }

  const colorClasses = {
    green: "text-black bg-green-200 border-green-400 dark:border-b dark:border-green-400 dark:bg-gray-900 dark:text-green-400",
    blue: "text-black bg-blue-200 border-blue-400 dark:border-b dark:border-blue-400 dark:bg-gray-900 dark:text-blue-400",
    red: "text-black bg-red-200 border-red-400 dark:border-b dark:border-red-400 dark:bg-gray-900 dark:text-red-400",
    purple: "text-black bg-purple-200 border-purple-400 dark:border-b dark:border-purple-100 dark:bg-gray-900 dark:text-purple-400",
    yellow: "text-black bg-yellow-200 border-yellow-400 dark:border-b dark:border-yellow-100 dark:bg-gray-900 dark:text-yellow-400",
    orange: "text-black bg-orange-200 border-orange-400 dark:border-b dark:border-orange-100 dark:bg-gray-900 dark:text-orange-400",
    stone: "text-black bg-stone-200 border-stone-400 dark:border-b dark:border-stone-100 dark:bg-gray-900 dark:text-stone-400",
  };
  

  return (
    <div
      className={classnames(
        "w-fit mx-1 ",
        "flex items-center",
        "rounded-full",
        "shadow-sm",
        colorClasses[color],
        sizeClasses[size],
      )}>
      <Dot color={color} />
      <p 
        className={classnames(
          "text-xs font-semibold", 
          "max-h-[15px]"
        )}>
        {title}
      </p>
    </div>
  )
}

export default Tag;