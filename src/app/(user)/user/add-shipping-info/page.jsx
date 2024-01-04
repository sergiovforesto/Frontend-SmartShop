'use client'
import { useState } from "react"
import Image from "next/image"
import Alert from "@/components/Alert"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "react-feather"
import axiosInstance from "@/components/axiosInstance"

export default function AddShippingInfo() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [alert, setAlert] = useState({})

    const [country, setCountry]= useState('')
    const [address, setAddress]= useState('')
    const [city, setCity]= useState('')
    const [phone, setPhone]= useState('')
    const [state, setState]= useState('')
    const [zipCode, setZipCode]= useState('')


    const showAlert = (alert) => {
        setAlert(alert)

        setTimeout(() => {
            setAlert({})
        }, 3000)
    }
    const createInformation = async() => {
        if([country, address, city, phone, state, zipCode].includes('')) {
            showAlert({
                message: 'Please complete all fields',
                error: true
            })
        return
        }

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
            const {data} = await axiosInstance.post('shipping-info', {
                country: country,
                state: state,
                city: city,
                address: address,
                phone: phone,
                zipCode: zipCode
            }, axiosConfig)


            new Promise((resolve) => {
                setTimeout(() => {
                    resolve(
                    showAlert({
                        message: data.msg,
                        error: false
                    }),

                )
                }, 1000)

            })

            setTimeout(() => {
                router.push('/user')
            }, 1200)
        
        } catch (error) {
            showAlert({
                message: error.response?.data.msg,
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

            <h2 className="text-xl font-bold text-letter">Account</h2>
        </div>

        <div className='bg-white border h-full rounded-xl'>
            <div className="px-10 py-8">
                
                <h2 className="text-secundary underline">
                    Add your shipping information
                </h2>

                <div className="grid md:grid-rows-3 grid-cols-1 gap-y-5 md:gap-y-4 md:grid-cols-2 mt-6">

                    <div className="flex gap-2 flex-col">
                        <p>Country:</p>
                        <input 
                            type="text"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            placeholder="Country"
                            className={`${error ? 'bg-bg-input border-2 w-full md:w-[90%] border-rose-500 rounded pl-2 text-sm h-8 outline-primary' : 'bg-bg-input border-2 w-full md:w-[90%] border-br-input rounded pl-2 text-sm h-8 outline-primary'}`}
                        />
                    </div>

                    <div className="flex gap-2 flex-col">
                        <p>Address:</p>
                        <input 
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Address"
                            className={`${error ? 'bg-bg-input border-2 w-full md:w-[90%] border-rose-500 rounded pl-2 text-sm h-8 outline-primary' : 'bg-bg-input border-2 w-full md:w-[90%] border-br-input rounded pl-2 text-sm h-8 outline-primary'}`}
                        />
                    </div>


                    <div className="flex gap-2 flex-col">
                        <p>Phone Number:</p>
                        <input 
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Phone number"
                            className={`${error ? 'bg-bg-input border-2 w-full md:w-[90%] border-rose-500 rounded pl-2 text-sm h-8 outline-primary' : 'bg-bg-input border-2 w-full md:w-[90%] border-br-input rounded pl-2 text-sm h-8 outline-primary'}`}
                        />
                    </div>


                    <div className="flex gap-2 flex-col">
                        <p>City:</p>
                        <input 
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder="City"
                            className={`${error ? 'bg-bg-input border-2 w-full md:w-[90%] border-rose-500 rounded pl-2 text-sm h-8 outline-primary' : 'bg-bg-input border-2 w-full md:w-[90%] border-br-input rounded pl-2 text-sm h-8 outline-primary'}`}
                        />
                    </div>

                    <div className="flex gap-2 flex-col">
                        <p>State:</p>
                        <input 
                            type="text"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            placeholder="State"
                            className={`${error ? 'bg-bg-input border-2 w-full md:w-[90%] border-rose-500 rounded pl-2 text-sm h-8 outline-primary' : 'bg-bg-input border-2 w-full md:w-[90%] border-br-input rounded pl-2 text-sm h-8 outline-primary'}`}
                        />
                    </div>


                    <div className="flex gap-2 flex-col">
                        <p>Zip Code:</p>
                        <input 
                            type="text"
                            value={zipCode}
                            onChange={(e) => setZipCode(e.target.value)}
                            placeholder="Zip Code"
                            className={`${error ? 'bg-bg-input border-2 w-full md:w-[90%] border-rose-500 rounded pl-2 text-sm h-8 outline-primary' : 'bg-bg-input border-2 w-full md:w-[90%] border-br-input rounded pl-2 text-sm h-8 outline-primary'}`}
                        />
                    </div>
                </div>

                <button 
                    type="button"
                    onClick={createInformation}
                    className="bg-primary w-full md:w-auto text-white font-semibold rounded mt-6 px-5 py-[6px]"
                >
                    {loading ? (
                        <div className="flex justify-center items-center">
                            <Image
                                src={'/spinner.svg'}
                                width={18}
                                height={15}
                                alt="vector"
                                className="animate-spin"
                            />
                        </div>
                        
                    ): (
                        <span>
                            save
                        </span>
                    )}
                </button>

                <div className="flex justify-start mt-3">
                    {message && <Alert message={message} error={error}/>} 
                </div>
            </div>


        </div>
    </>
  )
}
