
import { getUserByUsernameAction } from "actions/users/getUserAction";
import NotesList from "./NotesList";

export default async function UserNotesPage({ params }) {
    const username = params.username;
    const creator = await getUserByUsernameAction({ username });
    return (
        <div className="w-full">
            <NotesList uploaderId={creator.id} />
        </div>
    )
}