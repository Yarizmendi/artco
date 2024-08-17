
import Link from "next/link"
import { getUsers } from "@/mongo/actions/sketchActions"

export default async function Homepage() {
  const users = await getUsers()
  return (
    <div className="flex grow justify-center items-center">
      <div>
        {users.map(user=><Link key={user._id} href={`/${user._id}`}>{user.name}</Link>)}
      </div>
    </div>
  )
}