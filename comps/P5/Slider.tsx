
function Slider({
  label,
  sliderValue, 
  description,
  children
}) {

  return (
    <div className="flex w-11/12 my-4">
      <div className="flex flex-col justify-center items-center px-4">
        <p className="border rounded-md text-xs px-4 py-3">{ sliderValue }</p>
        <label className="text-[12px]" htmlFor="slider">{label}</label>
      </div>
   
      <div className="flex flex-col justify-center">
        <p className="text-[13px] my-2 overflow-hidden h-[40px]">{description}</p>
      </div>
    </div>
  )
}

export { Slider }

