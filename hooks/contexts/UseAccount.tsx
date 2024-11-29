
"use client"
import { createContext, useState } from 'react'

export const UserAccountContxt = createContext({
  user: null,
  setUser: null
})

export function UserAccountProvider() {
    const [ user, setUser ] = useState(null)
    return (
      <UserAccountContxt.Provider value={{ user, setUser}}>
        <div>
            { user && <h1> Welcome, {user["username"]} </h1>}
        </div>
      </UserAccountContxt.Provider>
    )
}