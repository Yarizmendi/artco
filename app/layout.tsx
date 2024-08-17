
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
    <html lang="en">
      <DarkModeProvider>
        <NavBar/>
        {children}
        <footer className="bg-slate-200 dark:bg-slate-950 h-[40px]" />
      </DarkModeProvider>
    </html>
  )
} 

export default RootLayout
