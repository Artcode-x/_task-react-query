import React from "react"

const JokeCard = ({ joke }) => {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "16px",
        margin: "8px",
        borderRadius: "8px",
      }}
    >
      <p>{joke}</p>
    </div>
  )
}

export default JokeCard
