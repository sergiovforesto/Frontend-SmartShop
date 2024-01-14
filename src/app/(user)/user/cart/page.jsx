'use client'
import { useEffect, useState } from "react"
import useCartContext from "@/app/hooks/useCartContext"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { resetMoney } from "@/helpers/resetMoney"
import {X} from 'react-feather'
import axiosInstance from "@/components/axiosInstance"


export default function ShoppingCart() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const [hasInfomartion, setHasInformation] = useState(false)
    const [hasPayment, setHasPayment] = useState(false)

    const {cart, setCart, subTotalToPay, totalToPay} = useCartContext()

    const deleteProduct = (id) => {
        const removeProduct = cart.filter((product) => product.productId !== id)
        return setCart(removeProduct)
    }

    

    useEffect(() => {
        const verifyShippingInfo = async() => {
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
                const shippingInfo = await axiosInstance('/shipping-info/information', axiosConfig)
                if(shippingInfo.data) return setHasInformation(true)
            } catch (error) {
                if(error.response.data.msg) return setHasInformation(false)
            }
        }

        verifyShippingInfo()
    }, [])

    useEffect(() => {
        const verifyPayment = async() => {
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
                const payment = await axiosInstance('/payments', axiosConfig) 
                if(payment.data) return setHasPayment(true)
            } catch (error) {
                if(error.response.data.msg) return setHasPayment(false)
            }
        }

        verifyPayment()
    }, [])



    const handlePurchase = () => {
        if(!hasInfomartion) {
             alert('Please, Add a Shipment information')
            return router.push('/user')
        }

        if(!hasPayment) {
             alert('Please, Add a Payment Method first')
            return router.push('/user/payments')
        }

        router.push('/purchase-summary')
    }


    return (
      <>
        <div className="mb-5">
          <h1 className="text-xl font-bold text-letter">My Cart</h1>
        </div>
        <div className="bg-white border h-full rounded-xl">
          <div className="xl:px-6 px-5 py-8 ">
            <div>
                <h2 className="text-lg font-semibold underline text-letter-2">
                    Shopping Cart
                </h2>

                <p className="text-secundary font-semibold mt-3">{cart.length} products</p>
                <hr className="xl:w-[60%] border-gray-300"/>
            </div>

            
            <section 
                className="flex flex-col-reverse justify-start gap-5 xl:flex-row mt-8"
            >
                {cart.length === 0 && (
                    <div className="flex flex-col justify-center items-center xl:w-[60%]">

                        <Image 
                            src='/empty-cart.png'
                            width={200}
                            height={200}
                            alt="empty"
                        />
                        <p className="font-bold text-letter-2 mt-2 pl-6">Empty</p>
                    </div>
                )}
                <div className={`${cart.length === 0 ? 'hidden' : 'w-full flex flex-col gap-y-5 xl:w-[60%]'}`}>
                    {cart?.map((product, index) => (
                        <div key={index} className="border rounded-lg flex items-center px-3">
                            <div className="">
                                <Image 
                                    src={`http://localhost:5000/api/v1/uploads/${product.image}`}
                                    width={140}
                                    height={140}
                                    alt="img-cart"
                                    className="rounded-lg"
                                />
                            </div>

                            <div className="ml-5 py-3 w-full">
                                <div className="flex justify-between">

                                    <h2 className="text-letter-2 font-semibold">{product.name}</h2>
                                    <button 
                                        type="button"
                                        onClick={() => deleteProduct(product.productId)}
                                        className="border rounded-full p-[6px] px-[6px] hover:bg-slate-50"
                                    >
                                        <X size={15}/>
                                    </button>
                                </div>
                                <p className=" text-letter-2">
                                    USD:{' '} 
                                    <span className="">{resetMoney(product.price)}</span> 
                                </p>

                                <p className="font-semibold text-success text-[12px] mt-1 mb-1">
                                    <span className="font-normal">{product.discount}% OFF</span> 
                                </p>

                                <p className="font-semibold text-letter-2 text-sm">
                                    color:{' '}
                                    <span className="font-normal">{product.color}</span> 
                                </p>

                                <p className="font-semibold text-letter-2 text-sm">
                                    quantity:{' '}
                                    <span className="font-normal">{product.quantity}</span> 
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/**Total, subtotal etc.. */}
                <div className='w-full xl:w-[40%]'>
                    <div className="bg-white border p-5 rounded xl:sticky top-0">
                        <div className="mb-3 text-letter-2 font-semibold">
                            
                            <p>
                                Subtotal:{' '}
                                <span className="font-normal">{resetMoney( subTotalToPay(cart) )}</span>
                            </p>
                            <p>
                                Total:{' '} 
                                <span className="font-normal">{resetMoney( totalToPay(cart) )}</span>
                            </p>

                        </div>


                        <button 
                            type="button"
                            onClick={handlePurchase}
                            disabled={cart.length === 0}
                            className={`${cart.length === 0 ? 'bg-blue-300 w-full text-white text-sm py-[5px] rounded-sm cursor-not-allowed' : 'bg-primary w-full text-white text-sm py-[5px] rounded-sm hover:bg-blue-600 cursor-pointer'}`}
                        >
                            Proceed to checkout
                        </button>
                    </div>
                </div>

            </section>
           
          </div>
        </div>
      </>
    )
}
  