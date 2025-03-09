import Link from "next/link"

export default function ArtbookPage() {
    return (
        <div className="w-full h-full border flex space-x-4 p-4">
            <ArtbookCard title={"transitions"} />
            <ArtbookCard title={"shaders"} />
            <ArtbookCard title={"bezier"} />
        </div>
    )
}

function ArtbookCard({ title }) {
    return (
        <Link href={`artbook/${title}`} className="border w-[250px] h-[150px] p-4">
            <p>{title}</p>
        </Link>
    )
}