
"use client"
import Link from 'next/link'
import { useContext } from 'react'
import { DarkModeContext } from '@/hooks/index.ts'

interface Props {
  links: any[]
  navStyle?: string
  spanStyle?: string
  linkStyle?: string
  ctnStyle?: string
}

const styles = {
  nav: "h-fit flex items-center justify-end tracking-wide uppercase text-[12px]",
  span: "material-symbols-outlined cursor-pointer",
  link: "p-2",
  ctn: "p-[10px]"
}

function BaseNav( props: Props ) {
  const { themeClass, setThemeClass } = useContext( DarkModeContext )
  const isDarkMode = themeClass === "dark"
  const onClickChange = () => setThemeClass( isDarkMode ? "light" : "dark")
  return (
    <div className={ styles.ctn }>
      <span className="material-symbols-outlined cursor-pointer pl-16 pt-8" onClick={ onClickChange }>brightness_6</span>
      <nav className={ styles.nav }>
        { props.links.map(( link, idx ) => 
          <Link 
            key={ idx }
            className={ styles.link }
            href={ link.path }
          > { link.text }
          </Link> 
        )}
      </nav>
    </div>
  )
}

export default BaseNav
