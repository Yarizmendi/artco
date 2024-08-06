
import { NavBar } from "@/comps/Nav/NavBar"
import "./globals.css"
import { DarkModeProvider } from "hooks"

export const metadata = {
  title: "The Art Co.",
} 

interface IRootLayout {
  children: JSX.Element[]
}

function RootLayout({ children }: IRootLayout ): JSX.Element {
  return (
    <html lang="en" className="h-screen w-screen">
      <DarkModeProvider>
        <NavBar/>
        <main>
          {children}
        </main>
      </DarkModeProvider>
    </html>
  )
} 

export default RootLayout
