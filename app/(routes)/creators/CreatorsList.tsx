
"use client"
import { UseCreators } from "@/api/creators/UseCreators";
import Link from "next/link";

export default function CreatorsList() {
    const { data } = UseCreators();
    const creators = data && data.mongoUsers;
    return (
        <div className="flex gap-4 p-4">
            { creators &&  creators.map( creator => <Link href={`/creators/${creator.username}`}>{creator.username}</Link> )}
        </div>
    )
}