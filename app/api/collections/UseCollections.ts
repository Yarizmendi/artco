
import useSWR from "swr"

export function UseCollections() {
  const fetcher = url => fetch(url).then((res) => res.json())
  const { data, error, isLoading, isValidating, mutate} = useSWR(`/api/collections`, fetcher)
  return {
    data, 
    error, 
    mutate,
    isValidating,
    isLoading
  }
}