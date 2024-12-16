
import classNames from 'classnames'
import { ThemeButton } from './ThemeButton'
import { LogoName } from './Logo'
import { AuthedLinks } from './AuthedLinks'

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
      <nav>
        <AuthedLinks />
      </nav>
    </header>
  )
}

