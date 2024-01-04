'use client'
import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import Alert from "@/components/Alert"
import { ArrowLeft, Trash } from "react-feather"
import axiosInstance from "@/components/axiosInstance"

export default function DeletePayment() {
    const router = useRouter()

    const [loading, setLoading] = useState(false)
    const [alert, setAlert] = useState({})

    const [payment, setPayment] = useState([])

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
                setPayment(objectPayment)
            } catch (error) {
                console.error(error)
            }
        }

        getPaymentMethod()
    }, [])

    const showAlert = (alert) => {
        setAlert(alert)
    
        setTimeout(() => {
            setAlert({})
        }, 3000)
    }

    const deletePaymentMethod = async() => {
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
            setLoading(true)
            const deletePayment = await axiosInstance.delete('/payments', axiosConfig)

            showAlert({
                message: deletePayment.data.msg,
                error: false
            })
    
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve(
                        showAlert({
                            message: deletePayment.data.msg,
                            error: false
                        })
                    )
                }, 1000)
            })
    
            setTimeout(() => {
                router.push('/user/payments')
            }, 2000)

        } catch (error) {
            console.log(error)
        }
    }

    const {message, error} = alert
  return (
    <>
        <div className="mb-5">
            <div 
                onClick={() => router.back()}
                className="mb-4 text-slate-500 hover:bg-slate-100 cursor-pointer rounded-full border w-fit px-2 py-2"
            >
                <ArrowLeft size={15}/>
            </div>

            <h3 className="text-xl font-bold text-letter">
                Delete Payment Method
            </h3>
        </div>
        
        <div className="bg-white border h-full rounded-xl">
        <div className="px-10 py-8">

          <section className="">

            <div className="flex gap-4 items-center">
                {payment && (
                    <div className="border rounded-md px-3 py-2 xl:w-max flex flex-col-reverse gap-y-2 md:flex-row md:gap-x-8">
                    <p className="text-secundary text-sm font-semibold">{payment.fullName}</p>
                    <p className="text-letter-2 text-sm font-semibold">{payment.exp}</p>

                    <Image 
                        src='/visa.svg'
                        width={40}
                        height={40}
                        alt="visa"
                    />
                    </div>
                )}

              
                <button 
                    type="button"
                    onClick={deletePaymentMethod}
                    className="bg-danger w-max text-white text-sm px-4 py-[6px] rounded-sm hover:bg-rose-600"
                >   
                    <div className="flex justify-center items-center">

                        {loading ? (
                            <Image
                                src="/spinner.svg"
                                width={18}
                                height={15}
                                alt="vector"
                                className="animate-spin"
                            />
                        ): (
                            <Trash size={16}/>
                        )}
                    </div>
                    
                </button>
            </div>
            
            <div className="flex justify-start items-center mt-1">
                {message && <Alert message={message} error={error}/>}
            </div>
          </section>
         
        </div>
      </div>    
    </>
  )
}
