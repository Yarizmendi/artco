
import Link from 'next/link'
import classNames from 'classnames'
import { ThemeButton } from './ThemeButton'
import { getRoutes } from 'actions/routes'
import { LogoName } from './Logo'
import { Suspense } from 'react'
import { ActionButton } from '../Buttons/ActionButton'
import { Loading } from '../Loading'

function NavBar() {
  return (
    <header className={classNames(
      "min-h-[80px] px-[40px] py-2 tracking-widest",
      "flex flex-col justify-between items-center md:flex-row",
      "bg-slate-200 dark:bg-slate-950 rounded"
    )}>
      <div className='flex items-center'>
        <ThemeButton/>
        <LogoName/>
      </div>
      <Suspense fallback={<Loading/>}>
        <SuspenseRoutes/>
      </Suspense>
    </header>
  )
}

async function SuspenseRoutes() {
  const routes = await getRoutes()
  return (
    <nav className='flex justify-center items-center'>
      { routes.map((link,i)=> 
        <Link key={i} href={link.path} className={classNames("uppercase text-xs m-2")}>
          {link.title}
        </Link>
      )}
      <div className='flex mx-4 gap-4'>
        <Link href={"/accounts"}>
          <ActionButton color={"blue"} idleTxt='login' />
        </Link>
      </div>
  </nav>
  )
}

export { NavBar }
