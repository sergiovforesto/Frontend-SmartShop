'use client'
import { Trash } from "react-feather"
import Image from "next/image"
import { useRouter } from 'next/navigation'
import { useState, useEffect } from "react"
import axiosInstance from "@/components/axiosInstance"
import Alert from "@/components/Alert"

export default function DeleteProduct({params: {id}}) {

    const router = useRouter()
    const [products, setProducts] = useState({})


    const [loading, setLoading] = useState(false)
    const [alerta, setAlerta] = useState({})
    const [img, setImg] = useState()
    const [dataCollection, setDataCollection] = useState([])

    
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
                const objectProduct = product.data
                setProducts(objectProduct)

                const colec = await axiosInstance(`/collections/${objectProduct.collectionId}`, axiosConfig)
                const colection = colec.data.collection
                setDataCollection(colection)

                setImg(objectProduct.imageUrl)

                return objectProduct
            } catch (error) {
                console.log(error.response.data)
            }
        }
        getProduct()
    },[id])

    const showAlert = (alert) => {
        setAlerta(alert)
    
        setTimeout(() => {
            setAlerta({})
        }, 3000)
    }

    const destroyProduct = async() => {
        const message = '¿Do you wish delete this product?'
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
            const product = await axiosInstance.delete(`/products/${id}`, axiosConfig)
            setLoading(true)
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve(
                        showAlert({
                            message: product.data.msg,
                            error: false
                        })
                    )
                }, 1000)
            })
            
            setTimeout(() => {
                router.push('/admin/products')
            }, 1200)
        } catch (error) {
            console.log(error.response.data)
        }
    }

    

    const pathImg = `http://localhost:5000/api/v1/uploads/${img}`
    const {message, error} = alerta
  return (
    <>
      <div className="mb-5">
        <h1 className="text-xl font-bold text-letter">
            Product:
            <span className="text-danger font-bold"> {products.title}</span>
        </h1>
      </div>
      <div className="bg-white border h-full rounded-xl">
        <div className="px-10 py-8">
            <section

            >
                <div>
                    <h2 className="text-txt-5E font-semibold pb-2">Title</h2>

                    <input 
                        type="text"
                        placeholder="title"
                        defaultValue={products.title}
                        disabled
                        className="px-4 py-1 border-2 outline-none rounded bg-bg-input w-full"
                    />
                </div>

                <div className="mt-10">
                    <h2 className="text-txt-5E font-semibold pb-2">Description</h2>

                    <textarea 
                        cols="25" rows="4"
                        defaultValue={products.description}
                        disabled
                        className="px-4 py-2 border-2 outline-none rounded bg-bg-input w-full"
                        placeholder="Description..."
                    />
                
                </div>

                <div className="mt-10">
                    <h2 className="text-txt-5E font-semibold pb-2">Media</h2>
                
                    <div className="flex flex-col justify-center items-center border-2 border-dashed bg-bg-input h-52">
                        <Image
                            src={pathImg}
                            width={150}
                            height={150}
                            alt="img"
                        />

                    </div>
                </div>

                <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-x-5 gap-y-6 mb-10">

                    <div>
                        <h2 className="text-txt-5E font-semibold pb-2">Cost per item</h2>

                        <input 
                            type="text"
                            placeholder="0"
                            defaultValue={products.price}
                            disabled
                            className="px-4 py-1 border-2 outline-none rounded bg-bg-input w-full"
                        />
                    </div>

                    <div>
                        <h2 className="text-txt-5E font-semibold pb-2">Discount %</h2>

                        <input 
                            type="text"
                            placeholder="%"
                            defaultValue={products.discount}
                            disabled
                            className="px-4 py-1 border-2 outline-none rounded bg-bg-input w-full"
                        />
                    </div>

                    <div>
                        <h2 className="text-txt-5E font-semibold pb-2">Free Shipping</h2>
                        
                        <div className="flex">
                        
                        <div className="px-4 py-1 border-2 outline-none rounded bg-bg-input w-full">
                            <span className="text-semibold">
                                {products.freeShipping === true ? 'true' : 'false'}
                            </span>
                        </div>

                        </div>
                    </div>

                    <div>
                        <p className="text-txt-5E font-semibold pb-2" >Active</p>

                        <div className="px-4 py-1 border-2 outline-none rounded bg-bg-input w-full">
                            <span className="text-semibold">
                                {products.status === true ? 'true' : 'false'}
                            </span>
                        </div>
                    </div>


                    <div>
                        <h2 className="text-txt-5E font-semibold pb-2">Collection</h2>
                        
                        <div className="px-4 py-1 border-2 outline-none rounded bg-bg-input w-full">
                            <span>
                                {dataCollection.title}
                            </span>
                        </div>
                    </div>


                    <div>
                        <h2 className="text-txt-5E font-semibold pb-2">Color</h2>

                        <input 
                            type="text"
                            placeholder="color"
                            disabled
                            defaultValue={products.color}
                            className="px-4 py-1 border-2 outline-none rounded bg-bg-input w-full"
                        />
                    </div>

                    <div>
                        <h2 className="text-txt-5E font-semibold pb-2">Stock</h2>

                        <input 
                            type="number"
                            defaultValue={products.stock}
                            disabled
                            className="px-4 py-1 border-2 outline-none rounded bg-bg-input w-full"
                        />
                    </div>

                
                </div>
                
                <div className=''>
                    <div className="h-3 flex flex-start mb-2">
                        {message && <Alert message={message} error={error}/>}
                    </div>
                    <button 
                        type="submit"
                        onClick={destroyProduct}
                        disabled={loading}
                        className={`${loading ? 'bg-danger hover:cursor-not-allowed text-white text-sm py-[6px] rounded px-5' : 'bg-danger hover:bg-rose-600 text-white text-sm py-[6px] rounded px-5'}`}
                    >
                        <div>
                            {loading ? (
                                <div className="px-4 flex justify-center sm:flex-none">
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
