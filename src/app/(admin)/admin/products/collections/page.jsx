'use client'
import { useEffect, useState } from "react"
import RowListCollection from "@/app/(admin)/components/RowListCollection"
import Pagination from "@/app/(admin)/components/Pagination"
import Image from "next/image"
import Link from "next/link"
import axiosInstance from "@/components/axiosInstance"


export default function Collections({searchParams}) {

  const currentPage = Number(searchParams?.page) || 1;
  const [totalPages, setTotalPages] = useState(1)
  const [collections, setCollections] = useState([])
  const [empty, setEmpty] = useState(false)


  useEffect(() => {

    const getCollections = async () => {
      const token = localStorage.getItem('token')
      if(!token) {
          setLoading(false)
          return
      }

              
      const axiosConfig = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        params: {
          page: currentPage
        }
      }
      try {
        const collection = await axiosInstance('/collections', axiosConfig)
        const objectData = collection.data.productsByCollection
        setCollections(objectData)
        setTotalPages(Math.ceil(collection.data.quantityCollections / 11))
      } catch (error) {
        console.log(error.response.data)
        setEmpty(true)
      }
    }
    getCollections()
  }, [currentPage])
 
  return (
    <>
      <div className="mb-5 flex justify-between items-center">
        <h1 className="text-xl font-bold text-letter">Collections</h1>

        <Link
          href='/admin/products/collections/create'
          className={`${collections.length === 0 ? 'hidden' : 'px-6 py-1 bg-primary text-white rounded hover:bg-blue-700 hover:shadow shadow-blue-600 font-semibold text-xl'}`}
        >
          +
        </Link>
      </div>

    {empty ? (
        <div className="h-[37rem] w-full flex flex-col items-center justify-center">
          <Image 
            src='/Nothing here.svg'
            width={230}
            height={230}
            alt="nothing-here"
          />
          <h2 className="text-letter text-xl mt-3">Collections is empty</h2>
          <Link
            href='/admin/products/collections/create'
            className="px-4 py-[6px] bg-primary text-white text-sm rounded mt-3 hover:bg-blue-600 hover:shadow shadow-blue-600"
          >
            Add one
          </Link>
        </div>
      ): (
        <>
        
          <div className="bg-white rounded-xl h-auto border">
            <div>
              <header className="px-5 py-2 rounded-t-xl">
                <div>
                  <button type="button" className="text-gray-500 px-4 py-1 border rounded-md bg-slate-50 hover:bg-slate-100" >
                    All
                  </button>
                </div>
              </header>

              <table className="table-fixed w-full">
                <thead className="bg-bar-admin text-white h-11 ">

                  <tr>
          
                    <th className="font-normal">#</th>
                    <th className="font-normal w-[20%]">Title</th>
                    <th className="font-normal w-[20%]">Products</th>
                    <th className="font-normal w-[50%]"></th>
                    
                  </tr>
                  
                </thead>

                <tbody className="h-11 text-letter">
                  {/**AQUI ES DONDE DEBES ITERAR */}
                  {collections?.map((collection) => (
                    <RowListCollection
                      key={collection.id}
                      id={collection.id}
                      title={collection.title}
                      quantityProducts={collection.quantityProducts}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <Pagination totalPages={totalPages}/>
        </>
      )}

    </>
  )
}
