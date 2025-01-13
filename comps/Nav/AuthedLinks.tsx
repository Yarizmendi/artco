

"use client"
import Link from 'next/link'
import { useContext } from 'react'
import { UserAccountContxt } from '@/hooks/index.ts'

export function AuthedLinks() {
    const { user } = useContext(UserAccountContxt)

    let routes = [
        { title: "uploads", path: `/${"66bd62276d3999b70d5fd91b"}/paintings`},
        { title: "sketches", path: `/${"66bd62276d3999b70d5fd91b"}/sketches`},
        { title: "tests", path: `/${"66bd62276d3999b70d5fd91b"}/sketches/tests`},
        // { title: "Login", path: "/auth/login"},
        // { title: "SignUp", path: "/auth/create"},
      ]

      if (user) routes = [
        { title: "paintings", path: `/${user.id}/inputs`},
        { title: "sketches", path: `/${user.id}/creations`},
        { title: "sketches", path: `/${user.id}/galleries`},
        { title: "sketches", path: `/${user.id}/machine`},
      ]

    return (
      <div className='flex justify-center items-center gap-4 uppercase text-xs'> 
      { routes.map((link,i)=> 
        <Link key={i} href={link.path}>
          {link.title}
        </Link>
      )}
    </div>
    )
  }
  