
import SketchContainer from "./SketchContainer"

export default function Homepage() {
  return (
    <div className=" flex justify-between border-4 border-red-500">
      <div>
        <h1>sketch controls</h1>
      </div>
      <SketchContainer />
    </div>
  )
}

