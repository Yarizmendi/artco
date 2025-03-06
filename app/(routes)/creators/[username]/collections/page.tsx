import { getUserByUsernameAction } from "actions/users/getUserAction";
import { CollectionList } from "app/(routes)/[user]/collections/CollectionList";

export default async function UserCollectionsPage({ params }) {
    const username = params.username;
    const creator = await getUserByUsernameAction({ username });
    return (
        <div>
            <CollectionList uploaderId={creator.id} />
        </div>
    )
}