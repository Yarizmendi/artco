
import Image from "next/image"
import {LoginForm} from "@/comps/Forms/Login"

export default function Login() {
  return (
    <div className="flex flex-col  md:h-full md:w-full md:flex-row">
      <LoginForm />
      <Image 
        width={500} height={500} alt="pic"
        className="hidden md:flex bg-gray-500 w-1/2 h-full"
        src={"https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/inbound7201685648055459688.jpg"} />
    </div>
  )
}
