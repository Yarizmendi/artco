
export default function CreatorPage({ params }) {
    const username = params.username
    return (
        <div>
            <p>Welcome, {username}</p>
        </div>
    )
}