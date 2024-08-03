
"use client"
import { useContext } from 'react'
import classNames from 'classnames'
import { DarkModeContext } from '@/hooks/index.ts'

function ThemeButton() {
    const iconTheme = {
      common: "bg-gradient-to-r",
      light: "from-blue-600 via-green-500 to-indigo-400",
      dark: "dark:from-blue-600 dark:via-yellow-500 dark:to-indigo-400"
    }
    const {isDarkMode, setIsDarkMode} = useContext(DarkModeContext)
    return (
      <span 
        onClick={() =>setIsDarkMode(!isDarkMode)}
        className={classNames(
        "material-symbols-sharp",
        "ml-10 cursor-pointer",
        "inline-block text-transparent bg-clip-text",
        iconTheme.common, iconTheme.light, iconTheme.dark
      )}> {isDarkMode?"dark_mode":"light_mode"}
    </span>
    )
  }
  
  export { ThemeButton }