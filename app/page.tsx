import Link from "next/link";

export default function LandingPage() {
    
    return (
        <div className="w-full border">

            <div className="w-full flex justify-between border m-4">
                <div className="flex flex-col space-y-2 border">
                  <Link href="/creators">See Creators</Link>
                  <Link href="/api/creators">Creators Api</Link>
                </div>
                

                <Link href="/explore">Explore Creations</Link>
                <Link href="/auth/login">Login</Link>
                <Link href="/auth/signup">SignUp</Link>
                <Link href="/playground">Get Started</Link>
            </div>

            <div className="w-full flex justify-between border m-4">
                <Link href="/api/shaders">Shaders from public</Link>
                <Link href="/api/stocks">Stocks APi</Link>
                <Link href="/api/vercel">Vercel APi</Link>
            </div>
        </div>
    )
}
