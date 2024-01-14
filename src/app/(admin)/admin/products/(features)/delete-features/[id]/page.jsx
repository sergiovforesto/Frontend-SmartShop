'use client'
import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import Alert from "@/components/Alert"
import axiosInstance from "@/components/axiosInstance"
import { Trash } from "react-feather"

export default function DeleteFeatures({params: {id}}) {
    const router = useRouter()

    const [products, setProducts] = useState([])
    const [features, setFeatures] = useState([])

    const [alert, setAlert] = useState({})
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const getProduct = async() => {

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
                const product = await axiosInstance(`/products/${id}`, axiosConfig)
                const objectProduct = product?.data
                setProducts(objectProduct)
                setFeatures(objectProduct?.product_features)
                return objectProduct
            } catch (error) {
                console.log(error)
            }
        }
        getProduct()
    }, [id])

    const showAlert = (alert) => {
        setAlert(alert)
    
        setTimeout(() => {
            setAlert({})
        }, 3000)
    }

    const deleteFeatures = async() => {

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
            const deleteFeature = await axiosInstance.delete(`/features/delete/${id}`, axiosConfig)

            setLoading(true)
            new Promise((resolve) => {
                setTimeout(() => {
                  resolve(
                    showAlert({
                      message: deleteFeature.data.msg,
                      error: false
                    })
                  )
                }, 1000)
            })
            
            
            setTimeout(() => {
                router.back()
            }, 1200)
        } catch (error) {
            console.log()
        }

    }

    const {message, error} = alert
    const {title} = products
    

    
  return (
    <>
        <div className="mb-5">
            <h1 className="text-xl font-bold text-letter">Update Features: 
                <span className="text-primary"> {title}</span> 
            </h1>
        </div>
        <div className="bg-white border h-full rounded-xl">
            <div className="px-10 py-8">
                <div className="grid grid-cols-1 gap-4">

                    <div className="flex items-center gap-x-4 gap-y-4">

                        <div className="w-full">
                            <p className="text-txt-5E font-semibold pb-2">Feature 1</p>
                            <input 
                                type="text"
                                placeholder={features[0]?.first}
                                className="px-4 py-1 w-full border-2 outline-none rounded bg-bg-input placeholder:text-letter-2" 
                            />
                        </div>

                        <div className="w-full">
                            <p className="text-txt-5E font-semibold pb-2">value</p>
                            <input 
                                type="text"
                                placeholder={features[0]?.firstValue}
                                className="px-4 py-1 w-full border-2 outline-none rounded bg-bg-input placeholder:text-letter-2" 
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-x-4 gap-y-4">

                        <div className="w-full">
                            <p className="text-txt-5E font-semibold pb-2">Feature 2</p>
                            <input 
                                type="text"
                                
                                placeholder={features[0]?.second}
                                className="px-4 py-1 w-full border-2 outline-none rounded bg-bg-input placeholder:text-letter-2" 
                            />
                        </div>

                        <div className="w-full">
                            <p className="text-txt-5E font-semibold pb-2">value</p>
                            <input 
                                type="text"
                                placeholder={features[0]?.secondValue}
                                className="px-4 py-1 w-full border-2 outline-none rounded bg-bg-input placeholder:text-letter-2" 
                            />
                        </div>
                    </div>


                    <div className="flex items-center gap-x-4 gap-y-4">

                        <div className="w-full">
                            <p className="text-txt-5E font-semibold pb-2">Feature 3</p>
                            <input 
                                type="text"
                                placeholder={features[0]?.third}
                                className="px-4 py-1 w-full border-2 outline-none rounded bg-bg-input placeholder:text-letter-2" 
                            />
                        </div>

                        <div className="w-full">
                            <p className="text-txt-5E font-semibold pb-2">value</p>
                            <input 
                                type="text"
                                placeholder={features[0]?.thirdValue}
                                className="px-4 py-1 w-full border-2 outline-none rounded bg-bg-input placeholder:text-letter-2" 
                            />
                        </div>
                    </div>


                    <div className="flex items-center gap-x-4 gap-y-4">

                        <div className="w-full">
                            <p className="text-txt-5E font-semibold pb-2">Feature 4</p>
                            <input 
                                type="text"
                                placeholder={features[0]?.fourth}
                                className="px-4 py-1 w-full border-2 outline-none rounded bg-bg-input placeholder:text-letter-2" 
                            />
                        </div>

                        <div className="w-full">
                            <p className="text-txt-5E font-semibold pb-2">value</p>
                            <input 
                                type="text"
                                placeholder={features[0]?.fourthValue}
                                className="px-4 py-1 w-full border-2 outline-none rounded bg-bg-input placeholder:text-letter-2" 
                            />
                        </div>
                    </div>


                    <div className="flex items-center gap-x-4 gap-y-4">

                        <div className="w-full">
                            <p className="text-txt-5E font-semibold pb-2">Feature 5</p>
                            <input 
                                type="text"
                                placeholder={features[0]?.fifth}
                                className="px-4 py-1 w-full border-2 outline-none rounded bg-bg-input placeholder:text-letter-2" 
                            />
                        </div>

                        <div className="w-full">
                            <p className="text-txt-5E font-semibold pb-2">value</p>
                            <input 
                                type="text"
                                placeholder={features[0]?.fifthValue}
                                className="px-4 py-1 w-full border-2 outline-none rounded bg-bg-input placeholder:text-letter-2" 
                            />
                        </div>
                    </div>

                </div>


                <button 
                    type="button"
                    onClick={deleteFeatures}
                    className="bg-danger px-5 py-[6px] rounded text-white text-sm flex justify-center items-center hover:bg-rose-700 w-full md:w-fit mt-5"
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
                    ) : (
                        <span className="flex items center gap-1">
                            delete
                            <Trash size={16} />
                        </span>
                    )}
                </button>

                <div className="h-3 flex flex-start mt-3">
                    {message && <Alert message={message} error={error}/>}
                </div>
            </div>
        </div>
    </>
  )
}
