import { useState } from 'react'
import { Search } from 'lucide-react'

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (query.trim()) {
      onSearch(query)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cerca una città..."
          className="w-full p-4 pr-12 rounded-xl border-0 
                    bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm
                    shadow-lg focus:ring-2 focus:ring-sky-400 
                    placeholder:text-sky-700/50 dark:placeholder:text-sky-300/50
                    text-sky-900 dark:text-sky-100
                    outline-none transition-all"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg
                    text-sky-700 dark:text-sky-300 hover:text-sky-500 
                    transition-colors"
        >
          <Search className="w-6 h-6" />
        </button>
      </div>
    </form>
  )
} 