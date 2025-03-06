import { getUserByUsernameAction } from "actions/users/getUserAction"
import {SketchesList} from "./SketchesList"

export default async function UserSketchesPage({ params }) {
    const username = params.username
    const creator = await getUserByUsernameAction({ username })
    return (
        <div className="w-full">
            <SketchesList creatorId={creator.id} />
        </div>
    )

}