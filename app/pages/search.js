"use client"

import React, { useEffect, useState } from "react"
import { useQuery } from "react-query"
import { fetchJokes } from "../api/api"
import JokeCard from "../components/card"
import { useRouter } from "next/navigation"

const SearchPage = () => {
  const router = useRouter()
  const query = router.query || "" // Извлечение значения query из router.query

  const [searchQuery, setSearchQuery] = useState(query)

  useEffect(() => {
    if (query) {
      setSearchQuery(query) // Обновляю локальный state при изменении query в URL
    }
  }, [query])

  const {
    data: jokes,
    isLoading,
    error,
  } = useQuery(["jokes", searchQuery], () => fetchJokes(searchQuery), {
    enabled: typeof searchQuery === "string" && searchQuery.length >= 4, // Запрос выполняется только если searchQuery является строкой и длина >= 4
  })

  console.log(jokes)
  const handleInputChange = (e) => {
    const inputQuery = e.target.value
    setSearchQuery(inputQuery)

    // Обнов адресную строку без перезагрузки
    const url = new URL(window.location)
    url.searchParams.set("query", inputQuery)
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
          value={searchQuery} // Использ state
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
