
import useSWR from "swr"

export function UseSketches() {
  const url = `/api/sketches`
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

export function UseSketch({ creatorId, title }) {
  const url = `/${creatorId}/sketches/api/?title=${title}`
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




