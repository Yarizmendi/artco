
"use client"

import { getUsers } from "actions/users/getUserAction"
import useSWR from "swr"

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function UsersPage() {
  const { data, error, isLoading } = useSWR("/user", fetcher)
  console.log(data)
  if ( isLoading ) return <p>Loading...</p>
}