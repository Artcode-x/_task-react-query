"use client"

import React, { useEffect, useState } from "react"
import { useQuery } from "react-query"
import JokeCard from "../components/card"
import { useRouter } from "next/navigation"
import { fetchJokes } from "../api/api"

const SearchPage = () => {
  const router = useRouter()
  const initialQuery = router.query || ""
  const [searchQuery, setSearchQuery] = useState(initialQuery)

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.history.pushState({}, "", "/search")
    }
    setSearchQuery(initialQuery)
  }, [initialQuery])

  const {
    data: jokes,
    isLoading,
    error,
  } = useQuery(["jokes", searchQuery], () => fetchJokes(searchQuery), {
    enabled: typeof searchQuery === "string" && searchQuery.length >= 4,
  })

  const handleInputChange = (e) => {
    const inputQuery = e.target.value
    setSearchQuery(inputQuery)

    // Обновляем адресную строку без перезагрузки
    const url = new URL(window.location.origin + "/search")
    if (inputQuery) {
      url.searchParams.set("query", inputQuery)
    } else {
      url.searchParams.delete("query") // Удаляем параметр, если пусто
    }
    window.history.pushState({}, "", url)
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Поиск шуток</h1>
      <form>
        <input
          type="text"
          name="query"
          placeholder="Поиск шуток"
          value={searchQuery}
          onChange={handleInputChange}
          style={{ padding: "8px", width: "300px", marginRight: "8px" }}
        />
        <button type="button" onClick={() => router.push(`/search?query=${searchQuery}`)}>
          Поиск
        </button>
      </form>

      {isLoading && <p>Загрузка...</p>}
      {error && <p>Ошибка при получении шуток: {error.message}</p>}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
        {jokes && jokes.map((joke) => <JokeCard key={joke.id} joke={joke.value} />)}
      </div>
    </div>
  )
}

export default SearchPage
