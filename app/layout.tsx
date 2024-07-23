
import "@/css/globals.css"
import { DarkModeProvider } from "hooks"

export const metadata = {
  title: "The Art Co.",
} 

interface IRootLayout {
  children: any
}

function RootLayout({ children }: IRootLayout ): JSX.Element {
  return (
    <html lang="en">
      <DarkModeProvider>
        <div className='dark:bg-gray-900 dark:text-white text-md h-screen w-screen'>
          { children }
        </div>
      </DarkModeProvider>
    </html>
  )
} 

export default RootLayout
