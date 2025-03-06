
import useSWR from "swr"

export function UseShaders() {
  const fetcher = url => fetch(url).then((res) => res.json())
  const { data, error, isLoading, isValidating, mutate} = useSWR(`/api/vercel/shaders`, fetcher)
  // console.log(data)
  return {
    data, 
    error, 
    mutate,
    isValidating,
    isLoading
  }
}