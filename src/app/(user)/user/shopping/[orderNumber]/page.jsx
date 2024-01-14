'use client'
import { useState, useEffect } from "react"
import axiosInstance from "@/components/axiosInstance"
import Product from "@/components/Product"
import Image from "next/image"
import { resetMoney } from "@/helpers/resetMoney"

export default function MyOrderView({params: {orderNumber}}) {

    const [order, setOrder] = useState([])
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {

        const getOrderNumber = async() => {
    
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
            const order = await axiosInstance(`/orders/my-orders/${orderNumber}`, axiosConfig)
            const objectOrder = order.data?.order
            const objectProducts = order.data?.order?.products
            setOrder(objectOrder)
            setProducts(objectProducts)
            
            
          } catch (error) {
            console.log(error)
          }
        }
    
        getOrderNumber()
    }, [orderNumber])


  return (
    <>
        <div className="mb-5">
        <h1 className="text-xl font-bold text-letter">My Shopping</h1>
      </div>
      <div className="bg-white border h-full rounded-xl">
        <div className="px-10 py-8">
          <section>
            <h2 className="text-letter-2 font-semibold text-lg underline">
              Order:
            </h2>

            <hr className="mt-2"/>


            <div className={`${order?.length === 0 ? 'hidden' : 'mt-7 text-letter-2'}`}>
              <p className="flex justify-between items-center font-bold">Order Number:
                <span className="font-normal text-right">{order.orderNumber}</span>
              </p>

              <p className="flex justify-between items-center font-bold mt-1">Status:
                <span 
                  className={`font-normal text-white text-sm px-4 py-[6px] rounded
                    ${order.status === 'pending' && 'bg-secundary'}
                    ${order.status === 'shipped' && 'bg-primary'}
                    ${order.status === 'delivered' && 'bg-success'}
                    ${order.status === 'cancelled' && 'bg-gray-600'}
                  `}
                >
                  {order.status}
                </span>
              </p>

              <p className="flex justify-between items-center font-bold mt-1">Delivery date:
                <span className="font-normal text-right">{order.dateDelivery}</span>
              </p>

              <p className="flex justify-between items-center font-bold mt-1">SubTotal:
                <span className="font-normal text-right">{resetMoney(order.subTotal)}</span>
              </p>

              <p className="flex justify-between items-center font-bold mt-1">Total:
                <span className="font-normal text-right">{resetMoney(order.total)}</span>
              </p>

              <hr className="mt-2"/>


              <p className="flex justify-between items-center font-bold mt-5">
                Products:
              </p>

              <div className="mt-3 flex flex-col gap-5">
                {products?.map((product, index) => (
                  <Product 
                    key={index}
                    products={product}
                  />
                ))}

              </div>

            </div>


            {order?.length === 0 && (
              <div className="flex flex-col justify-center items-center mt-7">
                <Image 
                  src='/Nothing here.svg'
                  width={200}
                  height={200}
                  alt="empty"
                />
                <p>Empty</p>
              </div>
            )}

          </section>
         
        </div>
      </div>
    </>
  )
}
