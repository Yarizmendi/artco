
import "globals.css"
import Link from "next/link"

export const metadata = {
  title: "The Art Co."
} 

interface IRootLayout {
  children: any
}



export default function RootLayout({ children }: IRootLayout) {
  const links = [
    { path: "/artwork", text: "browse" },
    { path: "/family", text: "family" },
    { path: "/transitions", text: "transitions" }
  ]
  return (
    <html lang="en">
      <body className="bg-gray-900 text-white text-md">
        <menu className="flex justify-end m-[10px] my-[20px]">
          <nav className="flex justify-between min-w-[260px] tracking-wide uppercase text-[12px] items-center">
            <span className="material-symbols-outlined cursor-pointer">apps</span>
            { links.map(( link, idx ) => 
              <Link 
                key={ idx }
                href={ link.path }
              > { link.text }
              </Link> 
            )}
          </nav>
        </menu>
        <main className="">{ children }</main>
      </body>
    </html>
  )
}
