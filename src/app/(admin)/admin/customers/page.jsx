'use client'
import { useState, useEffect } from "react"
import axiosInstance from "@/components/axiosInstance"
import RowListCustomers from "../../components/RowListCustomers"
import Pagination from "../../components/Pagination"
import Image from "next/image"

export default function Customers({searchParams}) {

  const currentPage = Number(searchParams?.page) || 1;
  const [totalPages, setTotalPages] = useState(1)
  const [users, setUsers] = useState([])

  useEffect(() => {

    const getUsers = async() => {
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
        const users = await axiosInstance('/users', axiosConfig)
        const objecUsers = users.data.users
        setUsers(objecUsers)
        setTotalPages(Math.ceil(users.data.quantityUsers / 11))
      } catch (error) {
        console.log(error.response.data)
      }
    }
    getUsers()
  }, [])


  return (
    <>
      <div className="mb-5">
        <h1 className="text-xl font-bold text-letter">Customers</h1>
      </div>

      {!users ? (
        <div className="h-[37rem] w-full flex flex-col items-center justify-center">
          <Image 
            src='/Nothing here.svg'
            width={230}
            height={230}
            alt="nothing-here"
          />
          <h2 className="text-letter text-xl mt-3">Customers is empty</h2>
          
        </div>
      ) : (
        <>

          <div className="bg-white border h-auto rounded-xl">
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
                
                    <th className="font-normal text-sm sm:text-base">#</th>
                    <th className="font-normal text-sm sm:text-base">Name</th>
                    <th className="font-normal text-sm sm:text-base">Last Name</th>
                    <th className="font-normal text-sm sm:text-base">Email</th>
                    
                  </tr>
                  
                </thead>
  
                <tbody className="h-11 text-letter">
                  {/**AQUI ES DONDE DEBES ITERAR */}
                  {users.map((user) => (
                    <RowListCustomers 
                      key={user.id}
                      id={user.id}
                      name={user.name}
                      lastName={user.lastName}
                      email={user.email}
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
