import classnames from "classnames"

  export const box = classnames(
    "font-normal text-[10px]",
    "rounded cursor-pointer",
    "w-[35px] h-[35px]",
    "bg-slate-200 dark:bg-slate-800",
    "flex items-center justify-center"
  )
  

  export const Sliders = ({ inputs }) => {
    return <section>
      { inputs.map( inpt => <div className="flex items-center font-bold p-2">
        <div className="flex flex-col justify-center text-center mr-4">
            <p id={inpt.uniform+"Value"} className={box} />
            <label className="text-[9px] w-[35px] overflow-hidden" htmlFor={inpt.label}>{inpt.label}</label>
        </div>
        <div id={inpt.uniform+"Input"} className="flex flex-col max-h-[50px]">
            <p className="overflow-hidden text-[10px] pb-2">{inpt.description}</p>
         </div>
      </div> 
      )}
    </section>
  }

  export function createSliders({ inputs, p }) {
    inputs && inputs.length && inputs.map( input => {
      if ( input.type == "slider" ) {
        const { min, max, value, step } = input.settings
        input["Slider"] = p.createSlider( min, max, value, step ).parent(input.uniform+"Input"), 
        input["Paragraph"] = p.createP( value ).parent(input.uniform+"Value")
      }
    })
  }

  export function handleSliders({ inputs, ActiveShader }) {
    inputs && inputs.length && inputs.map((input) => {
      input["Paragraph"].html( input["Slider"].value())
      ActiveShader.setUniform( input.uniform, input["Slider"].value())
    })
  }
