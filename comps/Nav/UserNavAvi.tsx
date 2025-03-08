
import Link from "next/link"
import Image from "next/image"

interface IUser {
    username: string,
    avatar?: string
}

export default function UserNavAvi({ username, avatar }: IUser ) {
    const userInitial = username[0]
    return (
      <Link href={`/creators/${username}`} className="rounded-full w-10 h-10 border border-black dark:border-white flex items-center justify-center mx-4">
        { avatar 
          ? <Image 
              height={100}
              width={100} 
              src={avatar}
              alt={"user avatar"} 
              className="w-6 h-6 rounded-full"
            /> 
          : <p className="w-6 h-6 rounded-full flex items-center justify-center">{userInitial}</p>
        }
      </Link>
    )
}