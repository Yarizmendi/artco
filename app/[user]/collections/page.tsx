
import { CollectionList } from "./CollectionList"

export default function CollectionsPage ({ params}) {
  return (
    <div>
      <h1> Collections Page </h1>
        <CollectionList uploaderId={params.user} />
    </div>
  )
}