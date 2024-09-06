
import useSWR from "swr"

export function UseCollections({ uploaderId }) {
  const fetcher = url => fetch(url).then((res) => res.json())
  const { data, error, isLoading, isValidating, mutate} = useSWR(`/${uploaderId}/collections/api/?user=${uploaderId}`, fetcher)
  return {
    data, 
    error, 
    mutate,
    isValidating,
    isLoading
  }
}