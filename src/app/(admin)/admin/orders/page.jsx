'use client'
import { useState, useEffect } from "react"
import axiosInstance from "@/components/axiosInstance"
import Link from "next/link";
import Image from "next/image";
import Pagination from "../../components/Pagination";
import RowListOrder from "../../components/RowListOrder";

export default function Orders({searchParams}) {

  const currentPage = Number(searchParams?.page) || 1;
  const [totalPages, setTotalPages] = useState(1)
  const [orders, setOrders] = useState([])
  const [empty, setEmpty] = useState(false)

  


  useEffect(() => {
    const getOrders = async() => {
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
        const order = await axiosInstance('/orders/admin', axiosConfig)
        setOrders(order?.data?.orders)
        setTotalPages( Math.ceil(order?.data.quantityOrders / 12) )
      } catch (error) {
        console.log(error)
        setEmpty(true)
      }
    }

    getOrders()

  }, [currentPage])


  


  return (
    <>
      <div className="mb-5">
        <h1 className="text-xl font-bold text-letter">Orders</h1>
      </div>


      {empty && (
        <div className="h-[37rem] w-full flex flex-col items-center justify-center">
          <Image 
            src='/Nothing here.svg'
            width={230}
            height={230}
            alt="nothing-here"
          />
          <h2 className="text-letter text-xl mt-3">Order is empty</h2>
          
        </div>
      )}

      
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
                <th className="font-normal text-sm sm:text-base">Order</th>
                <th className="font-normal text-sm sm:text-base">Status</th>
                <th className="font-normal text-sm sm:text-base">Date Order</th>
                <th className="font-normal text-sm sm:text-base">Date Delivery</th>
                <th className="font-normal text-sm sm:text-base">SubTotal</th>
                <th className="font-normal text-sm sm:text-base">Total</th>
              </tr>
              
            </thead>

            <tbody className="h-11 text-letter">
              {/**AQUI ES DONDE DEBES ITERAR */}
              
              {orders?.map((order, index) => (
                
                <RowListOrder 
                  key={index}
                  id={order.id}
                  order={order.orderNumber}
                  status={order.status}
                  dateOrder={order.dateOrder}
                  dateDelivery={order.dateDelivery}
                  subTotal={order.subTotal}
                  total={order.total}
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
  )
}
