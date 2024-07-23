
export const housePaths = [
    { name: "your ocean changed", id: 34, path: "your_ocean_changed.png" },
    { name: "watery path", id: 39, path: "watery_path.jpg" },
]

export async function GET( request: Request ) {
    return Response.json({
        status: "200",
        data: housePaths
    })
}
 