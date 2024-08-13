"use client";
import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const Searchbar = () => {
    const [query, setQuery] = useState("")
    const router = useRouter()
    function handleSearch(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault()
        console.log(query)
        router.push(`/search?query=${query}`)
    }
return (
<form className="max-w-md mx-auto" onSubmit={handleSearch}>   
    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
             <Search className="w-4 h-4 text-gray-500 dark:text-gray-400"  />
        </div>
        <input 
          type="search" id="default-search" 
          onChange={e=>setQuery(e.target.value)}
          value={query}
          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-yellow-500 focus:border-yellow-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-yellow-500 dark:focus:border-yellow-500" placeholder="Search ..." required 
          />
        <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800">Search</button>
    </div>
</form>

  )
}

export default Searchbar