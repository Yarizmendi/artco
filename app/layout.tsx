
import "@/css/globals.css"
import { DarkModeProvider } from "hooks"

import Nav from "@/comps/Nav/BaseNav"

export const metadata = {
  title: "The Art Co.",
} 

interface IRootLayout {
  children: any
}

const baseNavLinks = [
  { title: "home", path: "/"},
  // { title: "about", path: "/about"},
  { title: "collections", path: "/collections"}
]

function RootLayout({ children }: IRootLayout ): JSX.Element {
  return (
    <html lang="en">
      <DarkModeProvider>
        <div className='dark:bg-gray-900 dark:text-white h-screen w-screen'>
          <Nav links={baseNavLinks} />
          { children }
        </div>
      </DarkModeProvider>
    </html>
  )
} 

export default RootLayout
