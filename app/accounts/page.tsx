
import { LoginForm } from "@/comps/Forms/Login"
import Image from "next/image"

export default function Login() {
  return (
    <div className="h-full flex justify-between items-center">
      <LoginForm />
      <Image 
        className="bg-gray-500 w-1/2 h-[600px]"
        src={"https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/inbound7201685648055459688.jpg"} 
        width={500}
        height={500} alt="pic" />
    </div>
  )
}
