
import Link from "next/link"
import "globals.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className=" h-full w-full p-[20px] bg-gray-900 text-white text-md" lang="en">
      <body className="h-fill w-fill ">
        <nav className=" border-2 w-full flex justify-around items-center mb-4" >
            <Link href={"/blends"}> Blends </Link>
            <Link href={"/mixes"}> Mixes </Link>
            <Link href={"/rotate"}> Rotate </Link>
            <Link href={"/trans"}> Transitions </Link>
        </nav>
        { children }
      </body>
    </html>
  )
}
