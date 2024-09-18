

import { CollectionsList } from "./CollectionsList"

export default function PaintingsPage({ params }) {
  return <CollectionsList uploaderId={params.user} />
}




  