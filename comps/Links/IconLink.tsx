
import { ICONLINED, PLUSCIRCLIE } from "data/css"
import Link from "next/link"

export function IconLink({ 
    txt, 
    href,
    googleIconName = PLUSCIRCLIE,
    googleCssClass = ICONLINED, 
  }: {
    googleIconName?: string,
    googleCssClass?: string,
    txt?: string,
    href: string
  }) {
  return (
    <Link href={href}>
      <span className={googleCssClass}>{googleIconName}</span>
      <p>{txt}</p>
    </Link>
  )
}