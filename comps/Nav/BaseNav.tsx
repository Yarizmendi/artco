
"use client"
import Link from 'next/link'
import { useContext } from 'react'
import { DarkModeContext } from '@/hooks/index.ts'


const styles = {
  span: "material-symbols-outlined cursor-pointer mr-4",
  nav: "flex items-center justify-end tracking-wide uppercase text-[12px] p-4 mb-4 dark:bg-gray-950",
  link: "p-3",
}

function BaseNav({ links }) {

  const { themeClass, setThemeClass } = useContext( DarkModeContext )
  const isDarkMode = themeClass === "dark"
  const onClickChange = () => setThemeClass( isDarkMode ? "light" : "dark")

  return (
    <nav className={ styles.nav }>
      <span className={styles.span} onClick={ onClickChange }>brightness_6</span>
        { links.map(( link, idx ) => 
          <Link 
            key={ idx }
            className={ styles.link }
            href={ link.path }
          > { link.title }
          </Link> 
        )}
    </nav>
  )
}

export default BaseNav
