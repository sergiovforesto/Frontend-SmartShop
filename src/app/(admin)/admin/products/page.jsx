'use client'
import { useState, useEffect } from "react"
import RowListProduct from "../../components/RowListProduct"
import Pagination from "../../components/Pagination"
import Image from "next/image"
import Link from "next/link"
import axiosInstance from "@/components/axiosInstance"


export default async function Products({searchParams}) {
  
  const currentPage = Number(searchParams?.page) || 1;
  const [totalPages, setTotalPages] = useState(1)
  const [products, setProducts] = useState([])
  const [empty, setEmpty] = useState(false)
  
  
  useEffect(() => {
    
    const getProducts = async() => {
      const token = localStorage.getItem('token')
      if(!token) {
          setLoading(false)
          return
      }

              
      const axiosConfig = {
        params: {
          page: currentPage
        }
      }

      try {
        const product = await axiosInstance(`/products`, axiosConfig)
        const objectProducts = product.data.products
        setProducts(objectProducts)
        setTotalPages(Math.ceil(product.data.quantityProducts / 12))
      } catch (error) {
        console.log(error.response.data)
        setEmpty(true)
      }
    }

    getProducts()
  }, [currentPage])

  return (
    <>
      <div className="mb-5 flex justify-between items-center">
        <h1 className="text-xl font-bold text-letter">Products</h1>
        <Link
          href='/admin/products/create'
          className={`${!products ? 'px-6 py-1 bg-primary text-white rounded hover:bg-blue-600 hover:shadow shadow-blue-600 font-semibold text-xl' : 'hidden'}`}
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
          <h2 className="text-letter text-xl mt-3">Products is empty</h2>
          <Link
            href='/admin/products/create'
            className="px-4 py-[6px] bg-primary text-white text-sm rounded mt-3 hover:bg-blue-600 hover:shadow shadow-blue-600"
          >
            Add one
          </Link>
        </div>
          
      ) : (
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

              <table className=" table-auto w-full">
                <thead className="bg-bar-admin text-white h-11">
                  <tr>
                    
                    <th className="font-normal text-sm sm:text-base">Id</th>
                    <th className="font-normal text-sm sm:text-base">Name</th>
                    <th className="font-normal text-sm sm:text-base">Status</th>
                    <th className="font-normal text-sm sm:text-base">Inventory</th>
                    <th className="font-normal text-sm sm:text-base">Price</th>
                    <th className="font-normal text-sm sm:text-base">Discount</th>
                    <th className="font-normal text-sm sm:text-base"></th>
                    <th className="font-normal text-sm sm:text-base"></th>
                  </tr>
                  
                </thead>

                <tbody className="h-11 text-letter">
                  {/**AQUI ES DONDE DEBES ITERAR */}
                  {products?.map((product) => (
                    <RowListProduct
                      key={product.id}
                      id={product.id}
                      title={product.title}
                      status={product.status}
                      stock={product.stock}
                      price={product.price}
                      discount={product.discount}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <Pagination
            totalPages={totalPages}
          />
        </>
      )} 
    </>
  )
}
