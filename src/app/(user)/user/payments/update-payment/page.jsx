'use client'
import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import axiosInstance from "@/components/axiosInstance"
import Alert from "@/components/Alert"
import { ArrowLeft } from "react-feather"

export default function UpdatePayment() {

    const router = useRouter()
    const [fullName, setFullName] = useState('')
    const [expiration, setExpiration] = useState('')
    const [cvv, setCvv] = useState(0)
    const [cardNumber, setCardNumber] = useState('')


    const [loading, setLoading] = useState(false)
    const [alert, setAlert] = useState({})

    const showAlert = (alert) => {
        setAlert(alert)
    
        setTimeout(() => {
            setAlert({})
        }, 3000)
    }

    const updatePayment = async() => {

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
    
        const newCreditCard = await axiosInstance.put('/payments', {
            fullName: fullName,
            exp: expiration,
            cvv: cvv,
            cardNumber: cardNumber
        }, axiosConfig)

        showAlert({
            message: newCreditCard.data.msg,
            error: false
        })

        new Promise((resolve) => {
            setTimeout(() => {
                resolve(
                    showAlert({
                        message: newCreditCard.data.msg,
                        error: false
                    })
                )
            }, 1000)
        })

        setTimeout(() => {
            router.push('/user/payments')
        }, 2000)

      } catch (error) {
        showAlert({
            message: error.response.data.msg,
            error: true
        })
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
            Update Payment Method
        </h3>
      </div>


      <div className="bg-white border h-full rounded-xl">
        <div className="px-10 py-8">
          <div>
            <p className="text-secundary underline">Update your payment method</p>
          </div>

          <section className="mt-5 flex md:justify-center">

            <div className="flex flex-col gap-y-4 w-full md:w-min">
                <div className="w-full flex flex-col">
                    <label htmlFor="" className="">Full Name</label>
                    <input 
                        type="text" name="" id="" 
                        className="bg-bg-input border-2 border-br-input rounded pl-2 text-sm h-8 outline-primary"
                        placeholder="name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value.toLowerCase())}
                    />
                </div>

                <div className="flex flex-col md:flex-row gap-y-4 md:gap-x-4 items-center">
                    <div className="flex flex-col w-full">
                        <label htmlFor="" className="">Expiration Date</label>
                        <input 
                            type="date" name="" id="" 
                            className="bg-bg-input border-2 border-br-input rounded pl-2 text-sm h-8 outline-primary"
                            placeholder="exp date"
                            value={expiration}
                            onChange={(e) => setExpiration(e.target.value)}
                        />
                    </div>
                    
                    <div className="flex flex-col w-full">
                        <label htmlFor="" className="">Security</label>
                        <input 
                            type="text" name="" id="" 
                            className="bg-bg-input border-2 border-br-input rounded pl-2 text-sm h-8 outline-primary"
                            placeholder="cvv"
                            maxLength={3}
                            min={3}
                            value={cvv}
                            onChange={(e) => setCvv(Number(e.target.value) )}
                        />
                    </div>
                </div>

                <div className="w-full flex flex-col">
                    <label htmlFor="" className="">N-Card</label>
                    <input 
                        type="text" name="" id="" 
                        className="bg-bg-input border-2 border-br-input rounded pl-2 text-sm h-8 outline-primary"
                        placeholder="number card"
                        maxLength={16}
                        min={16}
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}

                    />
                </div>

                <button 
                    type="button"
                    onClick={updatePayment}
                    className="w-full bg-primary text-white text-sm py-[6px] rounded-sm hover:bg-blue-700"
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
                            'Update your card'
                        )}
                    </div>
                    
                </button>

                {message && <Alert message={message} error={error}/>}
            </div>
          </section>
         
        </div>
      </div>
    </>
  )
}
