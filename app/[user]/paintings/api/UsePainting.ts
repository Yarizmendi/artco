
import useSWR from "swr"

export function UsePaintings({ uploaderId }) {
  const fetcher = url => fetch(url).then((res) => res.json())
  const { data, error, isLoading, isValidating, mutate} = useSWR(`/${uploaderId}/paintings/api/?user=${uploaderId}`, fetcher)
  return {
    data, 
    error, 
    mutate,
    isValidating,
    isLoading
  }
}