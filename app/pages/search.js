"use client"

import React, { useState } from "react"
import { useQuery } from "react-query"
import { fetchJokes } from "../api/api"
import JokeCard from "../components/card"

const SearchPage = () => {
  const [query, setQuery] = useState("")
  const {
    data: jokes,
    isLoading,
    error,
  } = useQuery(["jokes", query], () => fetchJokes(query), {
    enabled: query.length >= 4,
  })

  const handleSearch = (e) => {
    e.preventDefault()
    setQuery(e.target.value)
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Search Jokes</h1>
      <form onChange={handleSearch}>
        <input
          type="text"
          name="query"
          placeholder="Search Jokes"
          style={{ padding: "8px", width: "300px", marginRight: "8px" }}
        />
        <button type="submit">Поиск</button>
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
