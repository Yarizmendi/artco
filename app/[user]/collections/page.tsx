
import { CollectionsList } from "./Collections"

export default function PaintingsPage({ params }) {
  return <CollectionsList uploaderId={params.user} />
}
