

import EditorSketch from "./EditorSketch"

export default function Homepage({ params }) {
  return (
    <div>
      <EditorSketch path={ params.path } />
    </div>
  )
}
