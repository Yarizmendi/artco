
import { PaintingsList } from "./Paintings"

export default function PaintingsPage({ params }) {
  return <PaintingsList uploaderId={params.user} />
}




