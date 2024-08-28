
import { LoginForm } from "@/comps/Forms/Login"

export default function Login() {
  return (
    <div className="grow flex justify-between items-center">
      <LoginForm />
      <span className="bg-gray-500 w-1/2 h-full" />
    </div>
  )
}
