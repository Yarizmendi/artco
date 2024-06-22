
import "../../globals.css"
import Link from "next/link"
import { sketchTypes } from "../api/links"

export const metadata = {
  title: "The Art Co."
} 

interface IRootLayout {
  children: React.ReactNode
}

export default function RootLayout({ children }: IRootLayout) {
  return (
    <html className="h-full w-full bg-gray-900 text-white text-md py-[40px] px-[60px]" lang="en">
      <body>
        <menu className="flex justify-end p-[10px]">
          <nav className="flex justify-between min-w-[260px] tracking-wide uppercase text-[12px]">
            { sketchTypes.map(( link, idx ) => 
              <Link 
                key={ idx }
                href={ link.path }
              > { link.text }
              </Link> 
            )}
          </nav>
        </menu>
        <main>{ children }</main>
      </body>
    </html>
  )
}
