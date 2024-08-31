"use client"

import React, { useEffect, useState } from "react"
import { useQuery } from "react-query"
import JokeCard from "../components/card"
import { useRouter } from "next/navigation"
import { fetchJokes } from "../api/api"
import { useDispatch, useSelector } from "react-redux"
import { updateTotalCount } from "../store/reducersSlice"
import { totalCountResults } from "../store/toolkitSelectors"

const SearchPage = () => {
  const router = useRouter()
  const initialQuery = router.query || ""
  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const dispatch = useDispatch()
  const total_count = useSelector(totalCountResults)

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.history.pushState({}, "", "/search")
    }
    setSearchQuery(initialQuery)
  }, [initialQuery])

  const {
    // data: { total = 0, result = [] } = {},
    data: jokes,
    isLoading,
    error,
  } = useQuery(["jokes", searchQuery], () => fetchJokes(searchQuery), {
    enabled: typeof searchQuery === "string" && searchQuery.length >= 4,
  })

  // Деструктуризация для total и result
  const total = jokes?.total || 0
  const result = jokes?.result || []

  useEffect(() => {
    if (total != 0) {
      dispatch(updateTotalCount(total))
    } else {
      dispatch(updateTotalCount(0))
    }
  }, [total])

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
    <div style={styles.container}>
      <form style={styles.form}>
        <input
          type="text"
          name="query"
          placeholder="Поиск шуток"
          value={searchQuery}
          onChange={handleInputChange}
          style={styles.input}
        />
        {`Total count: ${total_count}`}
        {/* <button
          type="button"
          onClick={() => router.push(`/search?query=${searchQuery}`)}
          style={styles.button}
        >
          Поиск
        </button> */}
      </form>

      {isLoading && <p>Загрузка...</p>}
      {error && <p style={styles.error}>Ошибка при получении шуток: {error.message}</p>}

      <div style={styles.jokeGrid}>
        {result && result.map((joke) => <JokeCard key={joke.id} joke={joke.value} />)}
      </div>
    </div>
  )
}

const styles = {
  container: {
    marginTop: "10%",
    padding: "40px",
    borderRadius: "8px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    margin: "0 auto",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  input: {
    padding: "20px",
    width: "-webkit-fill-available",
    border: "1px solid #ccc",
    borderRadius: "14px",
    fontSize: "16px",
    marginRight: "10px",
    color: "#656ec2",
  },
  button: {
    padding: "10px 15px",
    backgroundColor: "#0070f3",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "background-color 0.3s",
  },
  buttonHover: {
    backgroundColor: "#005bb5",
  },
  error: {
    color: "red",
    textAlign: "center",
  },
  jokeGrid: {
    marginTop: "2%",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
  },
}
export default SearchPage
