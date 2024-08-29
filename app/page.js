"use client"
import { QueryClient, QueryClientProvider } from "react-query"
import SearchPage from "./pages/search"

const queryClient = new QueryClient()

function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <SearchPage />
    </QueryClientProvider>
  )
}

export default Home
