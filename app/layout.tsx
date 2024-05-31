
import Link from "next/link"
import "globals.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className=" h-full w-full p-[20px] bg-gray-900 text-white text-md border-4 border-blue-500" lang="en">
      <body className=" border-4 border-green-500 h-fill w-fill ">
        <nav className=" w-full flex justify-around items-center border-4 " >
            <Link href={"/trans"}> Transitions </Link>
            <Link href={"/nature"}> Nature </Link>
            <Link href={"/science"}> Science </Link>
            <Link href={"/blends"}> Blends </Link>
            <Link href={"/morphs"}> Morphs </Link>
            {/* <Link href={"/projects"}> Projects </Link>
            <Link href={"/products"}> Products </Link> */}
            <Link href={"/comms"}> Communities </Link>
        </nav>
        { children }
      </body>
    </html>
  )
}
