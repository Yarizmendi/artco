
import { ShaderIconsWithLabels, ShaderIconWithLabel, shaderIconWithLabelStyle } from "@/p5/Shader"
import { getInputs } from "actions/sketchActions"

export async function InputOpts() {
  const inputOpts = await getInputs()
  return (
    <div>
        <div className='flex gap-2 items-center my-4 text-xs'>
            <label>Inputs:</label>
            {/* <input name={"inputs"}  /> */}
        </div>

        {/* <datalist> */}
            {inputOpts.map((inpt, idx)=> <div 
              key={idx} className={shaderIconWithLabelStyle}>
                <span className="material-symbols-outlined">{ inpt.icon }</span>
                <p>{inpt.label}</p>
                {/* <option value={inpt.uniform} /> */}
            </div> 
            )}
        {/* </datalist> */}


    </div>
  )
}