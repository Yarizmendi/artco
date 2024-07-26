
function Slider({
  label,
  description,
}) {

  return (
    <div className="flex w-11/12 my-4">
      <div className="flex flex-col justify-center items-center px-4">
        <div id={label+"value"} className="border rounded-md text-xs px-4 py-3" />
        <label className="text-[12px]" htmlFor="slider">{label}</label>
      </div>
      <div className="flex flex-col justify-center">
        <p className="text-[13px] my-2 overflow-hidden h-[40px]">{description}</p>
        <span id={label} />
      </div>
    </div>
  )
}

export { Slider }

