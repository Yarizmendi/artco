
import useSWR from "swr"

export function UseVercelImages() {
  const fetcher = url => fetch(url).then((res) => res.json())
  const { data, error, isLoading, isValidating, mutate} = useSWR(`/api/vercel/images`, fetcher)
  return {
    data, 
    error, 
    mutate,
    isValidating,
    isLoading
  }
}