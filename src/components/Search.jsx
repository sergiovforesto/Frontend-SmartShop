'use client'
import { Search } from "react-feather"
import useSearchContext from "@/app/hooks/useSearchContext"

export default function SearchInput() {

    const {searchInput, setSearchInput, searchingProduct} = useSearchContext()

    

  return (
    <>
        <input 
            type="text" 
            placeholder="Search product..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value.toLowerCase())}
            className='outline-none w-full bg-bg-input text-sm pl-2'

        />
        <button 
            type="button"
            className="border-l p-2 sm:p-3 hover:bg-slate-100"
            onClick={searchingProduct}
        >
            <Search className="h-4 text-txt-5E"/>
        </button>
    </>
  )
}
