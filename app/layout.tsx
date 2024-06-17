
import "./globals.css"
import Link from "next/link"
import { sketchTypes } from "./(api)/links"

export const metadata = {
  title: "The Art Company"
} 

interface IRootLayout {
  children: React.ReactNode
}

export default function RootLayout({ children }: IRootLayout) {
  return (
    <html className="h-full w-full bg-gray-900 text-white text-md p-[20px]" lang="en">
      <body className="h-fill w-fill px-[20px]">
        <menu className="flex justify-end py-[30px]">
          <nav className="w-[500px] flex justify-between tracking-wide text-sm">
            { sketchTypes.map(( link, key ) => 
              <Link key={ key } href={ link.path }>{ link.text }</Link> 
            )}
          </nav>
        </menu>
        <main>{ children }</main>
      </body>
    </html>
  )
}
