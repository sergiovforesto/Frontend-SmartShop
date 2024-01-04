'use client'
import { useState, useEffect } from "react"
import axiosInstance from "@/components/axiosInstance"
import Link from "next/link"
import Image from "next/image"
import { resetMoney } from "@/helpers/resetMoney"

export default function PurchaseSuccessfull() {

    const [invoice, setInvoice] = useState([])
    const [products, setProducts] = useState([])

    const [loading, setLoading] = useState(false)


    useEffect(() => {
        const getInvoice = async() => {
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
                const invoice = await axiosInstance('/orders', axiosConfig)
                const objectInvoice = invoice?.data?.lastOrder
                const objectProducts = invoice?.data?.lastOrder?.products
                setInvoice(objectInvoice)
                setProducts(objectProducts)
            } catch (error) {
                console.log(error)
            }
        }

        getInvoice()
    }, [])
    
    const {orderNumber, dateOrder, subTotal, total} = invoice
    
 
    return (
      <>
        <section className="flex flex-col-reverse justify-start gap-5 xl:flex-row w-full">
            <div className="w-full xl:w-[60%]">
                <h2 className="text-2xl font-bold text-letter-2 mb-5">
                    Invoice
                </h2>
                <div className="border px-7 py-7 rounded-md">
                    <div className="">
                        <header className="flex items-center justify-between">
                            <Image 
                                src='/smart-logo.svg'
                                width={120}
                                height={120}
                                alt="logo-invoice"
                            />

                            <div className="flex items-center text-sm">
                                <h3 className="text-letter-2 font-semibold underline">
                                    Invoice date
                                </h3>
                                <span>: {dateOrder}</span>
                            </div>
                        </header>

                        <hr className="mt-4"/>

                        <main className="mt-4 flex justify-between">
                            <div className="text-letter-2 w-[50%]">
                                <h2 className="text-lg font-bold">
                                    Provided to:
                                </h2>
                                <p className="font-semibold mt-1">
                                    Full Name: {' '}
                                    <span className="text-slate-500">{products[0]?.userName}</span>
                                </p>

                                <p className="font-semibold mt-1">
                                    Items: {' '}
                                    <span className="text-slate-500">{products.length}</span>
                                </p>

                            </div>

                            <div className="w-[50%]">
                                <p className="text-lg font-bold">
                                    Order#:
                                </p>
                                <p className="text-slate-500">{orderNumber}</p>
                            </div>
                        </main>

                        <hr className="mt-4"/>
                        
                        <div className="mt-7">
                            <div className="bg-slate-100 flex items-center justify-between px-4 text-lg font-bold">
                                <p>Description</p>
                                <p>Price</p>
                            </div>
                            {products?.map((product, index) => (
                                <>
                                    <div 
                                        key={index}
                                        className="flex items-center justify-between px-4 mt-3 text-slate-500" 
                                    >
                                        <p>{product.name}</p>
                                        <p>{resetMoney(product.price)}</p>

                                    </div>
                                </>
                            ))}
                        </div>
                        

                        <hr className="mt-4"/>
                        

                        <div className="font-bold mt-5 text-letter-2">
                            <p className="">SubTotal:{' '} 
                                <span className="text-slate-500 font-normal">{resetMoney(subTotal)}</span>
                            </p>
                            <p className="">Total:{' '} 
                                <span className="text-slate-500 font-normal">{resetMoney(total)}</span>
                            </p>
                        </div>

                    </div>
                </div>
            </div>


            {/**Continue shopping */}
            <div className="w-full mb-3 xl:mb-0 xl:w-[40%]">
                <div className="bg-white border p-5 rounded xl:sticky top-0">
                    <div className="w-full">
                        <h2 className="text-secundary font-semibold text-center">Thanks for your purchase!</h2>
                        
                        <Link
                            href='/'
                            className="bg-secundary hover:bg-secundary-hover text-white text-sm py-[6px] w-full flex items-center justify-center rounded mt-5"
                        >
                            Go Home
                        </Link>
                        
                    </div>
                </div>
            </div>
        </section>
      
      </>
    )
}