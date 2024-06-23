import React from "react"

interface ISketchLayout {
  path: string
  children: any
}

export default function ISketchLayout({ children }: ISketchLayout) {
  return (
    <html lang="en">
      <body className="bg-gray-900 text-white text-md"
        > { children }
      </body>
    </html>
  )
}
