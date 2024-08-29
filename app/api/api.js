import axios from "axios"

export const fetchJokes = async (query) => {
  const response = await axios.get(`https://api.chucknorris.io/jokes/search?query=${query}`)
  return response.data.result
}
