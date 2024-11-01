
import { NavBar } from "@/comps/Nav/NavBar"
import "./globals.css"
import { DarkModeProvider } from "hooks/contexts"

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

        <div className="flex flex-col h-screen">
          <NavBar/>
          <div className="flex grow">
            {children}
          </div>
          <footer className="bg-slate-200 dark:bg-slate-950 h-[50px]" />
        </div>

      </DarkModeProvider>
    </html>
  )
} 

export default RootLayout
