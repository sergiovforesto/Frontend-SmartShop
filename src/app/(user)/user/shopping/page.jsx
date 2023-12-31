'use client'
import { useState, useEffect } from "react"
import axiosInstance from "@/components/axiosInstance"
import Image from "next/image"
import Product from "@/components/Product"
import { resetMoney } from "@/helpers/resetMoney"


export default function MyShopping() {

  const [lastOrder, setLastOrder] = useState([])
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {

    const getLastOrder = async() => {

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
        const order = await axiosInstance('/orders', axiosConfig)
        const objectOrder = order.data.lastOrder
        const objectProducts = order.data?.lastOrder?.products
        setLastOrder(objectOrder)
        setProducts(objectProducts)
        
      } catch (error) {
        console.log(error)
      }
    }

    getLastOrder()
  }, [])

  return (
    <>
      <div className="mb-5">
        <h1 className="text-xl font-bold text-letter">My Shopping</h1>
      </div>
      <div className="bg-white border h-full rounded-xl">
        <div className="px-10 py-8">
          <section>
            <h2 className="text-letter-2 font-semibold text-lg underline">
              Last Order
            </h2>

            <hr className="mt-2"/>


            <div className={`${lastOrder?.length === 0 ? 'hidden' : 'mt-7 text-letter-2'}`}>
              <p className="flex justify-between items-center font-bold">Order Number:
                <span className="font-normal text-right">{lastOrder.orderNumber}</span>
              </p>

              <p className="flex justify-between items-center font-bold mt-1">Status:
                <span 
                  className={`font-normal text-white text-sm px-4 py-[6px] rounded
                    ${lastOrder.status === 'pending' && 'bg-secundary'}
                    ${lastOrder.status === 'shipped' && 'bg-primary'}
                    ${lastOrder.status === 'delivered' && 'bg-success'}
                    ${lastOrder.status === 'cancelled' && 'bg-gray-600'}
                  `}
                >
                  {lastOrder.status}
                </span>
              </p>

              <p className="flex justify-between items-center font-bold mt-1">Delivery date:
                <span className="font-normal text-right">{lastOrder.dateDelivery}</span>
              </p>

              <p className="flex justify-between items-center font-bold mt-1">SubTotal:
                <span className="font-normal text-right">{resetMoney(lastOrder.subTotal)}</span>
              </p>

              <p className="flex justify-between items-center font-bold mt-1">Total:
                <span className="font-normal text-right">{resetMoney(lastOrder.total)}</span>
              </p>

              <hr className="mt-2"/>


              <p className="flex justify-between items-center font-bold mt-5">
                Products:
              </p>

              <div className="mt-3 flex flex-col gap-5">
                {products?.map((products, index) => (
                  <Product 
                    key={index}
                    products={products}
                  />
                ))}

              </div>

            </div>


            {lastOrder?.length === 0 && (
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
