

function CustomSlider({ sliderParentId, sliderValueParentId, sliderLabel }) {
  return (
    <div className="flex items-center mx-2">
      <p id={ sliderValueParentId } className="px-2 py-1 mx-2 border rounded-md" />
      <div id={ sliderParentId } className="flex flex-col p-1 justify-center">
        <p>{ sliderLabel } </p>
      </div>
    </div>
  )
}

export { CustomSlider }