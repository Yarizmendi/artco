
import Link from "next/link"
// import classNames from "classnames"
// import { Dispatch, SetStateAction } from 'react'

{/* <span onClick={() => props.setValue('hello moon')}>{props.value}</span> */}

interface Props {
  links: any[]
  navStyle?: string
  spanStyle?: string
  linkStyle?: string
  ctnStyle?: string
  // value?: string
  // setValue?: Dispatch<SetStateAction<string>>
}

const styles = {
  nav: "h-fit flex items-center justify-end tracking-wide uppercase text-[12px]",
  span: "material-symbols-outlined cursor-pointer",
  link: "p-2",
  ctn: "p-[20px]"
}

function NavCmpt( props: Props ) {
  return (
    <div className={ styles.ctn }>
      <nav className={ styles.nav } >
        {/* <span className={ styles.span } > apps</span> */}
        { props.links.map(( link, idx ) => 
          <Link 
            key={ idx }
            className={ styles.link }
            href={ link.path }
          > { link.text }
          </Link> 
        )}
      </nav>
    </div>
  )
}

export default NavCmpt
