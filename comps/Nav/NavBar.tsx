
import Link from 'next/link'
import classNames from 'classnames'
import { ThemeButton } from './ThemeButton'
import { LogoName } from './Logo'

export function NavBar() {
  
  const routes = [
    // { title: "paintings", path: `/${"66bd62276d3999b70d5fd91b"}/paintings`},
    // { title: "sketches", path: `/${"66bd62276d3999b70d5fd91b"}/sketches`},
    // { title: "tests", path: `/${"66bd62276d3999b70d5fd91b"}/sketches/tests`},
    { title: "Login", path: "/auth/login"},
    { title: "SignUp", path: "/auth/create"},
    { title: "Explore", path: `/${"66bd62276d3999b70d5fd91b"}/sketches` },
  ]
  
  return (
    <header className={classNames(
      "p-4 md:p-6 md:tracking-widest",
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
      </nav>
    </header>
  )
}

