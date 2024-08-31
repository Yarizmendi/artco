
import useSWR from "swr"

export function UseTextures() {
    const fetcher = url => fetch(url).then((res) => res.json())
    const { data, error, isLoading, isValidating, mutate} = useSWR(`/textures/api`, fetcher)
    return {
      data, 
      error, 
      mutate,
      isValidating,
      isLoading
    }
  }