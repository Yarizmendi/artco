
"use client"
import { useContext } from 'react'
import classNames from 'classnames'
import { DarkModeContext } from '@/hooks/index.ts'

function ThemeButton() {
    const { themeClass, setThemeClass} = useContext(DarkModeContext)
    
    const handleThemeChange = () => {
      if (themeClass=="dark") setThemeClass("light")
      else if (themeClass=="light") setThemeClass("dark")
    }

    return (
      <span 
        onClick={handleThemeChange}
        className={classNames(
        "material-symbols-sharp",
        "ml-10 cursor-pointer",
        "inline-block text-transparent bg-clip-text",
        "bg-gradient-to-r",
        "from-blue-600 via-green-500 to-indigo-400",
        "dark:from-blue-600 dark:via-yellow-500 dark:to-indigo-400",
      )}> {themeClass=="dark" ? "dark_mode" : "light_mode"}
    </span>
    )
  }
  
  export { ThemeButton }