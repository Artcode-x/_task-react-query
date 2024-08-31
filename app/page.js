"use client"
import { QueryClient, QueryClientProvider } from "react-query"
import SearchPage from "./pages/search"
import { Provider } from "react-redux"
import store from "./store/store"

const queryClient = new QueryClient()

function Home() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <SearchPage />
      </QueryClientProvider>
    </Provider>
  )
}

export default Home
