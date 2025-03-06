
import useSWR from "swr"

export function UsePaintings({ uploaderId }) {
  const fetcher = url => fetch(url).then((res) => res.json())
  const { data, error, isLoading, isValidating, mutate} = useSWR(`/api/vercel/paintings`, fetcher)
  return {
    data, 
    error, 
    mutate,
    isValidating,
    isLoading
  }
}