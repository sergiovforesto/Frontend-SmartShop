'use client'
import { Trash } from "react-feather"
import Image from "next/image"
import { useRouter } from 'next/navigation'
import { useState, useEffect } from "react"
import axiosInstance from "@/components/axiosInstance"
import Alert from "@/components/Alert"

export default function DeleteCollection({params: {id}}) {
    const router = useRouter()
    const [collections, setCollections] = useState({})

    const [loading, setLoading] = useState(false)
    const [alerta, setAlerta] = useState({})

    useEffect(() => {
        const getCollection = async () => {
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
                const colec = await axiosInstance(`/collections/${id}`, axiosConfig)
                const collectionById = colec.data.collection
                setCollections(collectionById)
                return collectionById

            } catch (error) {
              console.log(error.response.data)
            }
        }
        getCollection()
    },[])

    const showAlert = (alert) => {
        setAlerta(alert)
    
        setTimeout(() => {
            setAlerta({})
        }, 3000)
    }

    const destroyCollection = async() => {
        const message = '¿Do you wish delete this collection?'
        if(!confirm(message)) {
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
            const collection = await axiosInstance.delete(`/collections/${id}`, axiosConfig)
            setLoading(true)
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve(
                        showAlert({
                            message: collection.data.msg,
                            error: false
                        })
                    )
                }, 1000)
            })
            
            setTimeout(() => {
                router.push('/admin/products/collections')
            }, 1200)
        } catch (error) {
            console.log(error.response.data)
        }
    }

    const {message, error} = alerta
  return (
    <>
        <div className="mb-5">
            <h1 className="text-xl font-semibold text-letter">
                Collection: 
                <span className="text-danger font-bold"> {collections.title}</span> 
          </h1>
        </div>
        <div className="bg-white border h-full rounded-xl">
            <div className="px-10 py-8">
                <section>
                    <div>
                        <h2 className="text-txt-5E font-semibold pb-2">Title</h2>

                        <input 
                            type="text"
                            className="px-4 py-1 border-2 outline-none rounded bg-bg-input w-full hover:cursor-not-allowed"
                            placeholder="title"
                            defaultValue={collections.title}
                            disabled
                        />
                    </div>

                    <div className="mt-5">
                        <h2 className="text-txt-5E font-semibold pb-2">Description</h2>

                        <textarea 
                            cols="25" rows="4"
                            className="px-4 py-2 border-2 outline-none rounded bg-bg-input w-full hover:cursor-not-allowed"
                            placeholder="Description..."
                            defaultValue={collections.description}
                            disabled
                        />
                    
                    </div>
                    
                    <div className="h-3 flex flex-start mb-2">
                        {message && <Alert message={message} error={error}/>}
                    </div>
                    <div className="mt-4">
                        <button 
                            type="button"
                            onClick={destroyCollection}
                            disabled={loading}
                            className={`${loading ? 'bg-danger hover:cursor-not-allowed text-white text-sm py-[6px] rounded px-5' : 'bg-danger hover:bg-rose-600 text-white text-sm py-[6px] rounded px-5'}`}
                        >
                            <div>
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
                                    <div className="flex items-center gap-1">
                                        Delete
                                        <Trash size={18}/>
                                    </div>
                                )}
                            </div>
                        </button>

                        
                    </div>
                </section>
            
            </div>
        </div>
    </>
  )
}
