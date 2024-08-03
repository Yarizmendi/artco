
"use client"
import Link from 'next/link'
import { useContext } from 'react'
import { DarkModeContext } from '@/hooks/index.ts'
import { bggd } from '../Links/SketchLink'

const iconStyles = {
  common: " material-symbols-sharp cursor-pointer mr-4",
  dark: " bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text",
  light: " dark:bg-gradient-to-r dark:from-blue-600 dark:via-yellow-500 dark:to-indigo-400"
}

const styles = {
  ctn: "flex items-center justify-between tracking-wide text-[12px] p-4 dark:bg-slate-950 rounded-lg px-[40px] h-[80px]",
  icon: iconStyles.common + iconStyles.dark + iconStyles.light,
  links: "p-3 font-normal",
}

function BaseNav({ links }) {

  const { themeClass, setThemeClass } = useContext( DarkModeContext )
  const isDarkMode = themeClass === "dark"

  const onClickChange = () => setThemeClass( isDarkMode ? "light" : "dark")

  return (
    <nav className={ styles.ctn }>

      <div className='uppercase'>
      <span className={styles.icon } onClick={ onClickChange }>
          { isDarkMode ? "dark_mode" : "light_mode" }
        </span>
        { links.map(( link, idx ) => 
          <Link 
            key={ idx }
            className={ styles.links }
            href={ link.path }
          > { link.title }
          </Link> 
        )}
      </div>
      <div className='flex items-center'>

        <Link href={"/"} className={"text-2xl dark:text-gray-200 tracking-widest" }>The<span className={bggd +" tracking-widest font-normal"}>ART</span><span className='dark:text-gray-400 text-lg'>Company.</span>
        </ Link>
      </div>
    </nav>
  )
}

export default BaseNav
