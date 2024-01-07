'use client'
import { useState, useEffect } from "react"
import axiosInstance from "@/components/axiosInstance"
import Link from "next/link"
import { resetMoney } from "@/helpers/resetMoney"

export default function History() {
    const [orders, setOders] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const getMyOrders = async() => {
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
                const myOrder = await axiosInstance('/orders/my-orders', axiosConfig)
                const objectOrder = myOrder.data.orders
                setOders(objectOrder)
            } catch (error) {
                console.log(error)
            }

        }

        getMyOrders()
    }, [])

     


  return (
    <>
        <div className="mb-5">
            <h1 className="text-xl font-bold text-letter">My History</h1>
        </div>

        <div className="bg-white border h-full rounded-xl">
            <div className="px-10 py-8">
                <section>
                    <h2 className="text-letter-2 font-semibold text-lg underline">
                        Shopping History
                    </h2>
                    
                    <p className="text-secundary font-semibold mt-4">Orders: {orders.length}</p>
                    <hr className="mt-2"/>

                    <div className="mt-7">
                        {orders?.map((order, index) => (
                            <div 
                                key={index}
                                className="border px-5 py-[6px] text-sm mb-4 rounded text-letter-2"
                            >
                                <div className="">
                                    <div className="flex justify-between items-center border-b">
                                        <p className="font-bold">Order Number:{' '}
                                            <Link 
                                                className="font-normal text-primary"
                                                href={`/user/shopping/${order.orderNumber}`}
                                            >#{order.orderNumber}
                                            </Link>
                                        </p>
                                        <p className="font-bold">Date: <span className="font-normal">{order.dateOrder}</span></p>

                                    </div>

                                    <ul className="mt-4 flex flex-col gap-1">
                                        <li className="font-bold flex justify-between">
                                            Delivery date:
                                            <span className="font-normal">{order.dateDelivery}</span>
                                        </li>

                                        <li className="font-bold flex justify-between">
                                            Status:
                                            <span className="font-normal">{order.status}</span>
                                        </li>

                                        <li className="font-bold flex justify-between">
                                            Total:
                                            <span className="font-normal">{resetMoney(order.total)}</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>


                </section>
            </div>
        </div>
    </>
  )
}
