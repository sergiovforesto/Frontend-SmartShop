'use client'
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import axiosInstance from "@/components/axiosInstance"
import { Plus, Edit, Trash } from "react-feather"

export default function Payment() {

  const [payment, setPayment] = useState([])
  const [empty, setEmpty] = useState(false)


  useEffect(() => {
    const getPaymentMethod = async() => {
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
        const {data} = await axiosInstance('/payments', axiosConfig)
        const objectPayment = data
        setPayment([objectPayment])
      } catch (error) {
        console.error(error)
        setEmpty(true)
      }
    }

    getPaymentMethod()
  }, [])

  return (
    <>
      <div className="mb-5">
        <h1 className="text-xl font-bold text-letter">Payment</h1>
      </div>
      <div className="bg-white border h-full rounded-xl">
        <div className="px-10 py-8">
          <section className="">
            <div className="flex justify-between items-center">
              <h3 className="text-letter-2 font-semibold text-lg underline">
                Payment Methods
              </h3>

              <Link
                href='/user/payments/add-payment'
                className={empty ? 'bg-primary text-white text-sm px-4 py-[6px] rounded' : 'hidden'}
              >
                <Plus size={16}/>
              </Link>

              <div className={!empty ? 'flex items-center gap-3' : 'hidden'}>

                <Link
                  href='/user/payments/update-payment'
                  className={!empty ? 'bg-secundary text-white text-sm px-4 py-[6px] rounded' : 'hidden'}
                >
                  <Edit size={16}/>
                </Link>

                <Link
                  href='/user/payments/delete-payment'
                  className={!empty ? 'bg-danger text-white text-sm px-4 py-[6px] rounded' : 'hidden'}
                >
                  <Trash size={16}/>
                </Link>
              </div>
            </div>
            
            <div className="mt-6">
              {payment.map((payMethod, i) => (
                <div
                  key={i} 
                  className="border rounded-md px-3 py-2 xl:w-max flex flex-col-reverse gap-y-2 md:flex-row md:gap-x-8"
                >
                  <p className="text-secundary text-sm font-semibold">{payMethod.fullName}</p>
                  <p className="text-letter-2 text-sm font-semibold">{payMethod.exp}</p>

                  <Image 
                    src='/visa.svg'
                    width={40}
                    height={40}
                    alt="visa"
                  />
                </div>
              ))}

              {empty && (
                <div className="flex flex-col justify-center items-center">
                  <Image 
                    src='/Nothing here.svg'
                    width={300}
                    height={300}
                    alt="empty"
                  />
                  <p className="text-letter-2 text-lg font-semibold">Empty</p>

                </div>
              )}
            </div>
          </section>
         
        </div>
      </div>
    </>
  )
}
