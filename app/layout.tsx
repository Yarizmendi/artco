
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
  { title: "artists", path: "/artists"},
  // { title: "collections", path: "/collections"},
  { title: "showcase", path: "/showcase"}
]

const darkClasses = "dark:bg-gray-900 dark:text-gray-300 "
const ligtClasses = "bg-gray-100 text-black-950 font-semibold "

function RootLayout({ children }: IRootLayout ): JSX.Element {
  return (
    <html lang="en">
      <DarkModeProvider>
        <div className={'h-screen w-screen font-thin ' + darkClasses + ligtClasses}>
          <Nav links={baseNavLinks} />
          { children }
        </div>
      </DarkModeProvider>
    </html>
  )
} 

export default RootLayout
