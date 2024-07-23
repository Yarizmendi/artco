
"use client"
import classNames from 'classnames'
import { createContext, useState } from 'react'

export const DarkModeContext = createContext({
    themeClass: 'dark',
    setThemeClass: null
})

export function DarkModeProvider({ children }) {
    const [ themeClass, setThemeClass ] = useState( 'dark' )
    return (
      <DarkModeContext.Provider value={{ themeClass, setThemeClass }}>
      <body 
        className={ classNames( themeClass )}> 
        { children }
      </body>
      </DarkModeContext.Provider>
    )
}