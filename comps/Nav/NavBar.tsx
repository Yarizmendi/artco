
import Link from 'next/link'
import classNames from 'classnames'
import { ThemeButton } from './ThemeButton'
import { LogoName } from './Logo'
import { ActionButton } from '../Buttons/ActionButton'

export function NavBar() {
  
  const routes = [
    // { title: "blog", path: `/blog`},
    { title: "collections", path: `/${"66bd62276d3999b70d5fd91b"}/collections`},
    { title: "paintings", path: `/${"66bd62276d3999b70d5fd91b"}/paintings`},
    { title: "sketches", path: `/${"66bd62276d3999b70d5fd91b"}/sketches`},
  ]
  
  return (
    <header className={classNames(
      "p-2 md:p-4 md:tracking-widest",
      "flex flex-col justify-between items-center md:flex-row",
      "bg-slate-200 dark:bg-slate-950 rounded",
    )}>
      <div className='flex items-center'>
        <ThemeButton />
        <LogoName />
      </div>
      <nav className='flex justify-center items-center gap-4 uppercase text-xs'>
        { routes.map((link,i)=> 
          <Link key={i} href={link.path}>
            {link.title}
          </Link>
        )}
        <Link href={"/accounts"}>
          <ActionButton color={"blue"} idleTxt='login' />
        </Link>
      </nav>
    </header>
  )
}

