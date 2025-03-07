
import useSWR from "swr"

export function UseNotes({ uploaderId }: { uploaderId?: string } ) {
  const fetcher = url => fetch(url).then((res) => res.json())
  const { data, error, isLoading, isValidating, mutate} = useSWR(`/api/vercel/notes/?creatorId=${uploaderId}`, fetcher)
  return {
    data, 
    error, 
    mutate,
    isValidating,
    isLoading
  }
}