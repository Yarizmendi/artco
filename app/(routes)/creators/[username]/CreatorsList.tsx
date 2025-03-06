
"use client"
import { UseCreators } from "@/api/creators/UseCreators";

export default function CreatorsList() {
    const { data } = UseCreators();
    const creators = data && data.mongoUsers;
    return (
        <div>
            <p>Creators List</p>
            { creators &&  creators.map( creator => <p>{creator.name}</p> )}
        </div>
    )
}