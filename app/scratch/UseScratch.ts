
import useSWR from "swr"

export function UseScratchData() {
  const url = `/scratch`
  const fetcher = url => fetch(url).then((res) => res.json())
  const { data, error, isLoading, isValidating, mutate} = useSWR(url, fetcher)
  return {
    data, 
    error, 
    mutate,
    isValidating,
    isLoading
  }
}




