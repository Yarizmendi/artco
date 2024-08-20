
import { getShaderInputById } from "actions/inputs/getShaderInputs"

export default async function Motion({ params }) {
  const id = params.id
  const { icon, type, label, uniform, settings, description } = await getShaderInputById(id)
  const { min, max, value, step } = settings
    return (
      <div className="grow">
        <h1>Motion</h1>

        <div>
          <p>{icon}</p>
          <p>{type}</p>
          <p>{label}</p>
          <p>{uniform}</p>
          <p>{description}</p>
          <p>{min}</p>
          <p>{max}</p>
          <p>{step}</p>
          <p>{value}</p>
        </div>

      </div>
    )
  }