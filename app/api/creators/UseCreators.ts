
import useSWR from "swr"

export function UseCreators() {
  const url = `/api/creators`
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





