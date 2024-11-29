
import Image from "next/image"
import { createUserAction } from "actions/users/getUserAction"

export function SignUpForm() {
    return (
      <div className="w-full flex justify-center md:justify-between dark:bg-slate-900 dark:text-gray-900 text-gray-700">

        <div className="w-full dark:bg-slate-900 p-8 rounded-lg">
          <h2 className="text-2xl font-semibold mb-6 text-center">Sign Up</h2>
          <form action={createUserAction}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-bold mb-2">Organization Name</label>
              <input
                type="text" id="name" name="name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300" 
                placeholder="Artco" required />
            </div>
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-bold mb-2">Username</label>
              <input
                type="text" id="username" name="username"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300" 
                placeholder="Benji" required />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-bold mb-2">Password</label>
              <input 
                type="password" id="password" name="password" 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300" 
                placeholder="Test" required />
            </div>
              <button type="submit" className="w-full bg-blue-700 text-white rounded-md py-2 px-4 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">{"Sign Up"}</button>
          </form>
        </div>

        <Image 
          width={500} height={500} alt="pic"
          className="hidden md:flex bg-gray-500 w-1/2 h-full"
          src={"https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/inbound7201685648055459688.jpg"} />

      </div>
    )
  }