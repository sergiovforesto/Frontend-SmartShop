'use client'
import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import axiosInstance from "@/components/axiosInstance"
import useCartContext from "@/app/hooks/useCartContext"
import { resetMoney } from "@/helpers/resetMoney"
import { X } from "react-feather"
import Alert from "@/components/Alert"

export default function PurchaseSummary() {
  const router = useRouter()

  const [alert, setAlert] = useState({})
  const [loading, setLoading] = useState(false)

  const [shippingInfo , setShippingInfo] = useState([])
  const [payments , setPayments] = useState([])

  const {cart, setCart, subTotalToPay, totalToPay} = useCartContext()

  const deleteProduct = (id) => {
    const removeProduct = cart.filter((product) => product.productId !== id)
    return setCart(removeProduct)
  }

  useEffect(() => {
    const products = JSON.parse(localStorage.getItem('products') )
    if(products.length === 0) {
      router.push('/')
      return
    }
  }, [router])

  useEffect(() => {
    const getShippingInfo = async() => {
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
          const objectInfo = shippingInfo.data.userHasInfo
          setShippingInfo(objectInfo)

      } catch (error) {
        console.log(error)
      }
    }

    getShippingInfo()
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
        const objectPayment = payment.data
        setPayments(objectPayment)
      } catch (error) {
        console.log(error)
      }
    }

    verifyPayment()
  }, [])

  const showAlert = (alert) => {
    setAlert(alert)

    setTimeout(() => {
      setAlert({})
    }, 3000)
  }

  const handlePurchase = async() => {


    const token = localStorage.getItem('token')
    if(!token) {
      setLoading(false)
      router.push('/')
      return
    }    
    const axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }

    try {
      const generateOrder = await axiosInstance.post('/orders', {
        products: cart,
        subTotal: parseFloat(subTotalToPay(cart)) ,
        total: parseFloat(totalToPay(cart))
      }, axiosConfig)


      setLoading(true)
      new Promise((resolve) => {
        setTimeout(() => {
          resolve(
            showAlert({
              message: generateOrder.data.msg,
              error: false
            })
          )
        }, 1000)
      })

      setTimeout(() => {
        setCart([])
        router.push('/purchase-successfull')
      }, 1200)

    } catch (error) {
      console.log(error)
    }
  }

  const {country, city, state, address} = shippingInfo
  const {fullName} = payments

  const {message, error} = alert

  return (
    <>
      <section className="flex flex-col-reverse justify-start gap-5 xl:flex-row w-full">
        <div className="w-full xl:w-[60%]">
          <div className="w-full">
            <h2 className="text-xl font-bold text-letter-2">Purchase Summary</h2>

            <div className="mt-2 text-letter-2 leading-7">
              <p className="font-bold">Send to: 
                <span className="font-normal text-primary"> {fullName}</span>
              </p>
              <p className="font-bold">Address: 
                <span className="font-normal text-primary"> {city}, {country}, {state}, {address}</span>
              </p>
              <div className="flex gap-3 items-center">
                <p className="font-bold">Payment methods: </p>
                <Image 
                  src='/visa.svg'
                  width={35}
                  height={35}
                  alt="visa"
                />
                <span className=" font-normal text-primary">{fullName}</span>
              </div>
            </div>

            <div>
              <p className="font-bold text-letter-2 ">Items: ({cart?.length})</p>
            </div>

            <hr  className="xl:hidden mb2 mt-5"/>

            <div className="w-full flex flex-col gap-y-5 mt-6">
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
          </div>
        </div>

        {/**COMPLETE THE PURCHASE */}
        <div className="w-full mb-3 xl:mb-0 xl:w-[40%]">
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
              className={`${cart.length === 0 ? 'bg-violet-300 w-full text-white text-sm py-[5px] rounded-sm cursor-not-allowed' : 'bg-secundary w-full text-white text-sm py-[5px] rounded-sm hover:bg-secundary-hover cursor-pointer'}`}
            >
              {loading ? (
                <div className="flex justify-center sm:flex-none">
                  <Image
                    src="/spinner.svg"
                    width={18}
                    height={15}
                    alt="vector"
                    className="animate-spin"
                  />
                </div>
              ): (
                <span>
                  Buy
                </span>
              )}
            </button>

            <div className="flex flex-start mb-2">
              {message && <Alert message={message} error={error}/>}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
