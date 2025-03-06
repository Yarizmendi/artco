import Link from "next/link"

export default function CreatorPage({ params }) {
    const username = params.username
    return (
        <div>
            <p>Welcome, {username}</p>
            <Link href={`${username}/sketches`}>sketches</Link>
            <Link href={`${username}/paintings`}>paintings</Link>
        </div>
    )
}