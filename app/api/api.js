import axios from "axios"

export const fetchJokes = async (query) => {
  const response = await axios.get(`https://api.chucknorris.io/jokes/search?query=${query}`)
  if (!response) {
    throw new Error("Что то не так, попробуйте позднее")
  }
  return response.data.result
}
