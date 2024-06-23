
import "globals.css"
import React from "react"

export const metadata = {
  title: "The Art Co."
} 

interface IRootLayout {
  children: any
}

export default function RootLayout({ children }: IRootLayout) {

  return (
    <html lang="en">
      <body className="bg-gray-900 text-white text-md">
        <main className="">{ children }</main>
      </body>
    </html>
  )
}
