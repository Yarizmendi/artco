
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
    <html lang="en">
      <body className="h-screen bg-gray-900 text-white text-md">
        <menu className="flex justify-end mr-[10px] my-[20px]">
          <nav className="flex justify-between min-w-[260px] tracking-wide uppercase text-[12px] items-center">
            <span className="material-symbols-outlined cursor-pointer">apps</span>
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
