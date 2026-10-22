'use client'

import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FormEvent, SetStateAction, useState } from 'react';

const SearchBar = () => {
  const [input, setInput] = useState<string>('')
  const router = useRouter()

  const handleChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setInput(e.target.value)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    router.push(`/search?q=${encodeURIComponent(input)}`)
    setInput('')
  }

  return (
    <>
      <form onSubmit={handleSubmit} className='my-4 max-w-2xl mx-auto px-4 pt-6'>
        <div className='relative'>
          <input
            value={input}
            onChange={handleChange}
            type='text'
            className='w-full rounded-full border border-gray-200 bg-white/50 px-5 py-3 pr-20 text-base shadow-md transition-shadow duration-200 hover:shadow-lg focus:border-gray-300 focus:outline-none'
            placeholder='Find a recipe' />
          <div className='absolute right-0 top-0 mr-4 mt-4'>
            <button type='submit' className='text-accent-one hover:text-accent-three'>
              <Search size={20} />
            </button>
          </div>
        </div>
      </form>
    </>
  )
}

export default SearchBar;