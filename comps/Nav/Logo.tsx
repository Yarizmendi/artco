
import Link from 'next/link'
import classNames from 'classnames'

export function LogoName() {
    return (
      <Link href={`/66bd62276d3999b70d5fd91b`} className={classNames("text-2xl font-light mx-[10px]")}>
         the
        <span 
         className={classNames(
         "inline-block text-transparent bg-clip-text",
         "bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400",
         )}> 
          art
        </span>
        <span className={classNames("")}>
          co.
        </span>
      </Link>
    )
  }
  