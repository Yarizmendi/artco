
'use client'
import { useFormStatus } from 'react-dom'

export const SubmitButton = () => {
  const { pending } = useFormStatus()
  return (
    <div>
      <button disabled={pending} type={"submit"} className="my-2 rounded dark:bg-green-800 px-4 py-2 text-xs font-semibold">
        { pending ? "loading": "submit" }
      </button>
    </div>
  )
};