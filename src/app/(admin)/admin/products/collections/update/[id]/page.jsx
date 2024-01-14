'use client'
import Image from "next/image"
import { useRouter } from 'next/navigation'
import { useState, useEffect } from "react"
import axiosInstance from "@/components/axiosInstance"
import Alert from "@/components/Alert"



export default function UpdateCollection({params: {id}}) {
    const router = useRouter()
    const [collections, setCollections] = useState({})

    const [updateTitle, setUpdateTitle] = useState('')
    const [updateDescription, setUpdateDescription] = useState('')
    const [loading, setLoading] = useState(false)
    const [alert, setAlert] = useState({})

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
    },[id])

    const showAlert = (alert) => {
        setAlert(alert)
    
        setTimeout(() => {
            setAlert({})
        }, 3000)
    }

    const updateCollection = async() => {

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
            
            const newCollection = await axiosInstance.put(`/collections/${id}`, {
                title: updateTitle || collections.title,
                description: updateDescription || collections.description
            }, axiosConfig)
            setLoading(true)

            new Promise((resolve) => {
                setTimeout(() => {
                  resolve(
                    showAlert({
                      message: newCollection.data.msg,
                      error: false
                    })
                  )
                }, 1000)
            })
            
            
            setTimeout(() => {
                router.push('/admin/products/collections')
            }, 1200)

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
          <h1 className="text-xl font-semibold text-letter">
            Collection: 
            <span className="text-primary font-bold">{collections.title}</span> 
          </h1>
        </div>
        <div className="bg-white border h-full rounded-xl">
          <div className="px-10 py-8">
            <section>
                <div>
                    <h2 className="text-txt-5E font-semibold pb-2">Title</h2>

                    <input 
                        type="text"
                        className="px-4 py-1 border-2 outline-none rounded bg-bg-input w-full"
                        placeholder="title"
                        defaultValue={collections.title}
                        onChange={(e) => setUpdateTitle(e.target.value)}
                    />
                </div>

                <div className="mt-5">
                    <h2 className="text-txt-5E font-semibold pb-2">Description</h2>

                    <textarea 
                        cols="25" rows="4"
                        className="px-4 py-2 border-2 outline-none rounded bg-bg-input w-full"
                        placeholder="Description..."
                        defaultValue={collections.description}
                        onChange={(e) => setUpdateDescription(e.target.value)}
                    />
                
                </div>
                
                <div className="h-3 flex flex-start mb-2">
                    {message && <Alert message={message} error={error}/>}
                </div>
                <div className="flex gap-5 mt-4">
                    <button 
                        type="button" onClick={updateCollection}
                        className="bg-primary hover:bg-blue-600 text-white py-[6px] px-5 rounded" 
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
                                <span>
                                    Save
                                </span>
                            )}
                        </div>
                    </button>

                    <button 
                        type="button" onClick={() => router.push('/admin/products/collections')}
                        className={`${loading ? 'cursor-not-allowed text-white px-4 py-2 rounded bg-rose-600' : 'bg-danger text-white px-4 py-2 rounded hover:bg-rose-600'}`}
                        disabled={loading}
                    >
                        Cancel
                    </button>
                </div>
            </section>

           
          </div>
        </div>
      </>
    )
}
  