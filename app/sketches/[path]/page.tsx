
import EditorSketch from "./EditorSketch"

export default function ArtEditor({ params }) {
  return (
    <EditorSketch  suppressHydrationWarning path={ params.path } />
  )
}
