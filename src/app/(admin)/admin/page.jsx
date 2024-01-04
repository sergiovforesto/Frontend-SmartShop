'use client'
import { useState, useEffect } from "react"
import axiosInstance from "@/components/axiosInstance"
import Link from "next/link"

export default function Admin() {
  const [orders, setOrders] = useState(0)
  const [users, setUsers] = useState(0)

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
        }
      }

      try {
        const orders = await axiosInstance('/orders/admin', axiosConfig)
        const objectOrder = orders.data?.quantityOrders
        setOrders(objectOrder)
      } catch (error) {
        console.log(error)
      }
    }

    getOrders()
  }, [])

  useEffect(() => {
    const geCustomers = async() => {
      const token = localStorage.getItem('token')
      if(!token) {
        setLoading(false)
        return
      }

              
      const axiosConfig = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }

      try {
        const users = await axiosInstance('/users', axiosConfig)
        const objectUser = users.data?.quantityUsers
        setUsers(objectUser)
      } catch (error) {
        console.log(error)
      }
    }

    geCustomers()
  }, [])



  return (
    <>
      <div className="mb-5">
        <h1 className="text-xl font-bold text-letter">Dashboard</h1>
      </div>
      <div className="bg-white shadow h-full rounded-xl">
        <div className="px-10 py-8 flex flex-col gap-4 justify-around sm:flex-row">
          
          <div className=" bg-blue-600 rounded-md px-5 py-7 flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 items-center">
              <div>
                <p className="text-white sm:text-center font-semibold text-2xl">Orders</p>
              </div>
              
              <div>
                <div className="sm:text-center">
                  <p className="text-white text-xl font-semibold">{orders}</p>
                  <p className="text-white font-semibold text-base">completed</p>
                </div>
              </div>
              
            </div>
          </div>



          <div className=" bg-danger rounded-md px-5 py-7 flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 items-center">
              <div>
                <p className="text-white sm:text-center font-semibold text-2xl">Users</p>
              </div>
              
              <div>
                <div className="sm:text-center">
                  <p className="text-white text-xl font-semibold">{users}</p>
                  <p className="text-white font-semibold text-base">New users</p>
                </div>
              </div>
              
            </div>
          </div>
         
        </div>
      </div>
    </>
  )
}
