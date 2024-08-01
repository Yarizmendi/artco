
function Slider({
  uniform,
  label,
  description,
}) {

  return (
    <div className="flex w-11/12 m-auto items-center justify-center py-2">
      <div id={uniform+"Value"} className="border rounded-md text-[10px] h-[30px] w-[150px] flex justify-center items-center" />
      <div className="flex flex-col ml-3" id={uniform+"Input"}>
        <label className="text-[10px]" htmlFor={label}>{label}</label>
        <p className="text-[11px] h-[15px] overflow-hidden">{description}</p>
      </div>
    </div>
  )
}

export { Slider }

