
import useSWR from "swr"

export function UseStockData() {
    // const url = `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&topics=technology,ipo&apikey=${process.env.ALPHA_VANTAGE_TOKEN}`
    const url = `/stocks`
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

