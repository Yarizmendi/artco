
import Link from 'next/link'
import classNames from 'classnames'
import { ThemeButton } from './ThemeButton'
import { getRoutes } from 'actions/routes'
import { LogoName } from './LogoName'

const routes = await getRoutes("home")

function NavBar() {
  return (
    <nav className={classNames(
      "h-[80px]",
      "flex justify-between items-center rounded-lg",
      "dark:bg-slate-950"
    )}>
      <div className=''>
        <ThemeButton/>
        {routes.map((link,i)=> 
          <Link 
            key={i}
            href={link.path} 
            className={classNames("uppercase px-4 text-xs")}>
              {link.title}
          </Link>)}
      </div>
      <LogoName/>
    </nav>
  )
}

export { NavBar }
