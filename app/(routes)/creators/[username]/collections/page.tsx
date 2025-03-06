import { getUserByUsernameAction } from "actions/users/getUserAction";
import { CollectionList } from "./CollectionList";

export default async function UserCollectionsPage({ params }) {
    const username = params.username;
    const creator = await getUserByUsernameAction({ username });
    return (
        <div className="w-full">
            <CollectionList uploaderId={creator.id} />
        </div>
    )
}