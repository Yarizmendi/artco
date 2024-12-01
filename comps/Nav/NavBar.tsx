
import Link from 'next/link'
import classNames from 'classnames'
import { ThemeButton } from './ThemeButton'
import { LogoName } from './Logo'

export function NavBar() {
  
  const routes = [
    // { title: "blog", path: `/blog`},
    // { title: "collections", path: `/${"66bd62276d3999b70d5fd91b"}/collections`},
    { title: "uploads", path: `/${"66bd62276d3999b70d5fd91b"}/paintings`},
    { title: "sketches", path: `/${"66bd62276d3999b70d5fd91b"}/sketches`},
    { title: "tests", path: `/${"66bd62276d3999b70d5fd91b"}/sketches/tests`},
  ]
  
  return (
    <header className={classNames(
      "p-2 md:py-4 md:px-8 md:tracking-widest gap-4",
      "flex flex-col justify-between items-center md:flex-row",
      "bg-slate-200 dark:bg-slate-950 rounded",
    )}>
      <div className='flex items-center'>
        <ThemeButton />
        <LogoName />
      </div>
      <nav className='flex justify-center items-center gap-8 uppercase text-xs'>
        <h2 className='underline text-md'>ben arizmendi </h2>
        { routes.map((link,i)=> 
          <Link key={i} href={link.path}>
            {link.title}
          </Link>
        )}
      </nav>
    </header>
  )
}

