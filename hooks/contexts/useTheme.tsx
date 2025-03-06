
"use client"
import { createContext, useState } from 'react'

export const DarkModeContext = createContext({
  themeClass: 'dark',
  setThemeClass: null
})

export function DarkModeProvider({children}) {
    const [ themeClass, setThemeClass ] = useState("dark")
    return (
      // @ts-ignore
      <DarkModeContext.Provider value={{themeClass, setThemeClass}}>
        <body className={themeClass}>{children}</body>
      </DarkModeContext.Provider>
    )
}