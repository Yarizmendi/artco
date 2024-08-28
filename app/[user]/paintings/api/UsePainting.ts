
import useSWR from "swr"
import { USERID } from "data/id"

export function UsePaintings() {
  const fetcher = url => fetch(url).then((res) => res.json())
  const { data, error, isLoading } = useSWR(`/${USERID}/paintings/api`, fetcher)
  return {
    data, 
    error, 
    isLoading
  }
}