
function Slider({
  label,
  sliderValue,
  setSliderValue,
  min, max, step, defaultValue,
  description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
}) {

  function handleSliderChange(e) {
    e.preventDefault()
    setSliderValue(e.target.value)
  }

  return (
    <div className="flex w-11/12 my-4">
      <div className="flex flex-col justify-center items-center px-4">
        <p className="border rounded-md text-xs px-4 py-3">{sliderValue}</p>
        <label className="text-[12px]" htmlFor="slider">{label}</label>
      </div>
      <div className="flex flex-col justify-center">
        <p className="text-[13px] my-2 overflow-hidden h-[40px]">{description}</p>
        <input type="range" id="slider" name="slider" min={min} max={max} step={step} defaultValue={defaultValue} onChange={ handleSliderChange } />
      </div>
    </div>
  )
}

export { Slider }

