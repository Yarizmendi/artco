
import { getUserByUsernameAction } from "actions/users/getUserAction"

export function LoginForm() {
    return (
      <div className="w-full flex justify-center dark:bg-slate-900 dark:text-gray-100 text-gray-700">
        <div className="dark:bg-slate-900 p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
          <form action={getUserByUsernameAction}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-bold mb-2">Username</label>
              <input defaultValue={"Ben"} type="text" id="username" name="username" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300" placeholder="Username" required />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-bold mb-2">Password</label>
              <input defaultValue={"Test"} type="password" id="password" name="password" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300" placeholder="Password" required />
            </div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <input type="checkbox" id="remember" name="remember" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                <label htmlFor="remember" className="ml-2 block text-sm">Remember me</label>
              </div>
              <a href="#" className="text-sm text-blue-700 hover:text-blue-500">Forgot password?</a>
            </div>
            <div>
              <button type="submit" className="w-full bg-blue-700 text-white rounded-md py-2 px-4 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">{"Sign in"}</button>
            </div>
          </form>
        </div>
      </div>
    )
  }