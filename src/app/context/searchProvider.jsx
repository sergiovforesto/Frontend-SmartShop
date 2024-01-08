'use client'

import axiosInstance from "@/components/axiosInstance"
import { useState, useEffect, createContext } from "react"
import { useSearchParams, usePathname, useRouter } from "next/navigation"

const SearchContext = createContext()

const SearchProvider = ({children}) => {

    
    const [searchInput, setSearchInput] = useState('')
    const [empty, setEmpty] = useState(false)
    const [product, setProduct] = useState([])


    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter()
    
    const createPageURL = (searchTerm) => {
        const params = new URLSearchParams(searchParams);
        
        params.set('productName', searchTerm.toString());
        console.log(`/products${pathname}?${params.toString()}`)

        return `/products?${params.toString()}`;
    };

    const searchingProduct = async() => {
        if(searchInput === '') {
            return setEmpty(true)
        }

        const axiosConfig = {
            params: {
                productName: searchInput
            }
        }

        try {
            const {data} = await axiosInstance('/products/search', axiosConfig)
            const objectProduct = data?.product
            setProduct(objectProduct)
            router.replace(createPageURL(searchInput))
            setSearchInput('')
        } catch (error) {
            console.log(error)
            setProduct([])
            router.push(createPageURL(searchInput))
        }
    }

    
    

    return (
        <SearchContext.Provider 
            value={{
                searchInput,
                setSearchInput,
                searchingProduct,
                empty,
                product
            }}
        >
            {children}
        </SearchContext.Provider>
    )
    
}

export {
    SearchProvider
}

export default SearchContext