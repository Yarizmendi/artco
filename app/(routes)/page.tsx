import Link from "next/link";

export default function LandingPage() {
    
    return (
        <div className="w-full border">

            <div className="w-full flex flex-col border gap-4 p-2">
                <Link href="/ffmpeg">ffmpeg</Link>
                
                <Link href="/blog">Blog</Link>
                <Link href="/auth/login">Login</Link>
                <Link href="/auth/signup">SignUp</Link>
                <Link href="/creators">Creators</Link>
                <Link href="/shaders">Shaders</Link>
                <Link href="/sketches">Sketches</Link>

                <Link href="/creators/Benji/sketches">Ben Sketches</Link>
                <Link href="/creators/Benji/paintings">Ben Paintings</Link>
                <Link href="/creators/Benji/collections">Ben Collections</Link>
           

                {/* <Link href="/playground">Create</Link> */}
                {/* <Link href="/collections">Create</Link> */}

                <Link href="/api/collections">Collections Api</Link>
                <Link href="/api/creators">Creators Api</Link>
                <Link href="/api/shaders">Shaders Api</Link>
                <Link href="/api/sketches">Sketches Api</Link>
                <Link href="/api/stocks">Stocks Api</Link>
                {/* <Link href="/api/vercel">Vercel Api</Link> */}
            </div>

          
        </div>
    )
}
