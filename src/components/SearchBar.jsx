import { useState } from 'react'

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch(query)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Cerca una città..."
        className="p-2 border rounded-lg"
      />
      <button type="submit" className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg">
        Cerca
      </button>
    </form>
  )
} 