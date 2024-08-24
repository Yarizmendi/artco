
import Link from 'next/link'
import classNames from 'classnames'

export function LogoName() {
    return (
      <Link href={`/`} className={classNames("text-3xl font-light mx-[10px]")}>
         the
        <span 
         className={classNames(
         "inline-block text-transparent bg-clip-text",
         "bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400",
         )}> 
          art
        </span>
        <span className={classNames("font-light")}>
          co.
        </span>
      </Link>
    )
  }
  