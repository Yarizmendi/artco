
import useSWR from "swr"

export function UseInputs() {
    const fetcher = url => fetch(url).then((res) => res.json())
    const { data, error, isLoading, isValidating, mutate} = useSWR(`/sketch`, fetcher)
    return {
      data, 
      error, 
      mutate,
      isValidating,
      isLoading
    }
  }