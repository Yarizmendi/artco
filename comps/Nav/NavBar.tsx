
import classNames from 'classnames'
import { ThemeButton } from './ThemeButton'
import { LogoName } from './Logo'
import { AuthedLinks } from './AuthedLinks'

export function NavBar() {
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
      <nav>
        <AuthedLinks />
      </nav>
    </header>
  )
}

