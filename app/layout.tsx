
import Link from "next/link"
import "globals.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <nav>
          <div>
            <Link href={"/blends"}> Blends </Link>
            <Link href={"/morphs"}> Morphs </Link>
            <Link href={"/transitions"}> Transitions </Link>
          </div>
          <div>
            <Link href={"/tech"}> Tech </Link>
            <Link href={"/nature"}> Nature </Link>
            <Link href={"/science"}> Science </Link>
            <Link href={"/comms"}> Communities </Link>
          </div>
          <div>
            <Link href={"/projects"}> Projects </Link>
            <Link href={"/products"}> Products </Link>
            <Link href={"/possibilities"}> Other Possibilities </Link>
          </div>
        </nav>
        { children }
      </body>
    </html>
  )
}
