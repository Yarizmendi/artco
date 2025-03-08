import { LogoName } from './Logo'
import classNames from 'classnames'
import { ThemeButton } from './ThemeButton'
import { AuthedLinks } from './AuthedLinks'
import UserNavAvi from './UserNavAvi'

export function NavBar() {
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
      <nav className='flex gap-4'>
        <UserNavAvi username='Benji' />
        <AuthedLinks />
      </nav>
    </header>
  )
}

