
import { getUserByUsernameAction } from "actions/users/getUserAction";
import PaintingsList from "./PaintingsList";

export default async function UserPaintingsPage({ params }) {
    const username = params.username;
    const creator = await getUserByUsernameAction({ username });
    return (
        <div>
            <PaintingsList uploaderId={creator.id} />
        </div>
    )
}