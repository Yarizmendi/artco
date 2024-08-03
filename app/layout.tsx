
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
  // { title: "home", path: "/"},
  // { title: "about", path: "/about"},
  { title: "artists", path: "/artists/arizmendi"},
  // { title: "collections", path: "/collections"},
  { title: "showcase", path: "/showcase"}
]

const darkClasses = "dark:bg-gray-900 dark:text-gray-300 "
const ligtClasses = "bg-gray-100 text-black-950 font-semibold "

function RootLayout({ children }: IRootLayout ): JSX.Element {
  return (
    <html lang="en">
      <DarkModeProvider>
        <div className={'border border-yellow-500 h-screen w-fill font-thin ' + darkClasses + ligtClasses}>
          <Nav links={baseNavLinks} />
          { children }
        </div>
      </DarkModeProvider>
    </html>
  )
} 

export default RootLayout
