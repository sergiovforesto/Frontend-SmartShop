'use client'
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import Alert from "@/components/Alert"
import Features from "@/app/(admin)/components/Features"
import axiosInstance from "@/components/axiosInstance"

export default function UpdateProduct({params: {id}}) {
  const router = useRouter()

  const [alert, setAlert] = useState({})
  const [loading, setLoading] = useState(false)
  const [img, setImg] = useState()

  const [products, setProducts] = useState([])


  const [updateTitle, setUpdateTitle] = useState('')
  const [updatedescription, setUpdateDescription] = useState('')
  const [updatePrice, setUpdatePrice] = useState('')
  const [updateDiscount, setUpdateDiscount] = useState('')
  const [updateFreeShipping, setUpdateFreeShipping] = useState(false)
  const [updateColor, setUpdateColor] = useState('')
  const [updateStock, setUpdateStock] = useState(0)
  const [updateStatus, setUpdateStatus] = useState(false)
  const [updateRating, setUpdateRating] = useState(1)
  const pathImg = `http://localhost:5000/api/v1/uploads/${img}`
  
  
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
                setImg(objectProduct.imageUrl)
                return objectProduct
            } catch (error) {
                console.log(error.response.data)
            }
        }
        getProduct()
    },[id])
    

    const showAlert = (alert) => {
        setAlert(alert)
    
        setTimeout(() => {
            setAlert({})
        }, 3000)
    }

    
    const updateProduct = async() => {

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
            
            const newProduct = await axiosInstance.put(`products/${id}`, {
                title: updateTitle || products.title,
                description: updatedescription || products.description,
                price: updatePrice || products.price,
                discount: updateDiscount || products.discount,
                freeShipping: updateFreeShipping,
                stock: updateStock || products.stock,
                color: updateColor || products.color,
                status: updateStatus,
                rating: updateRating
            }, axiosConfig)

            setLoading(true)
            new Promise((resolve) => {
                setTimeout(() => {
                  resolve(
                    showAlert({
                      message: newProduct.data.msg,
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

  const {message, error} = alert
  
  return (
    <>
      <div className="mb-5">
        <h1 className="text-xl font-bold text-letter">
            Product:
            <span className="text-primary font-bold"> {products.title}</span>
            
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
                        onChange={(e) =>  setUpdateTitle(e.target.value)}
                        className="px-4 py-1 border-2 outline-none rounded bg-bg-input w-full"
                    />
                </div>

                <div className="mt-10">
                    <h2 className="text-txt-5E font-semibold pb-2">Description</h2>

                    <textarea 
                        cols="25" rows="4"
                        defaultValue={products.description}
                        onChange={(e) =>  setUpdateDescription(e.target.value)}
                        className="px-4 py-2 border-2 outline-none rounded bg-bg-input w-full"
                        placeholder="Description..."
                    />
                
                </div>

                <div className="mt-10">
                    <div className="flex justify-between items-center mb-3">
                        <h2 className="text-txt-5E font-semibold pb-2">Media</h2>
                        <Link 
                            href={`/admin/products/update/${id}/${products.imageUrl}`}
                            className="text-primary underline"
                        >
                            change
                        </Link>
                    </div>
                
                    <div className="flex flex-col justify-center items-center border-2 border-dashed bg-bg-input h-52">
                        <Image
                            src={pathImg}
                            width={150}
                            height={150}
                            alt="img"
                            
                        />

                    </div>
                </div>

                <div className="mt-10 grid grid-cols-1 xl:grid-cols-6 gap-x-5 gap-y-6 mb-10">

                    <div>
                        <h2 className="text-txt-5E font-semibold pb-2">Cost per item</h2>

                        <input 
                            type="text"
                            placeholder="0"
                            defaultValue={products.price}
                            onChange={(e) => setUpdatePrice(e.target.value)}
                            className="px-4 py-1 border-2 outline-none rounded bg-bg-input w-full"
                        />
                    </div>

                    <div>
                        <h2 className="text-txt-5E font-semibold pb-2">Discount %</h2>

                        <input 
                            type="text"
                            placeholder="%"
                            defaultValue={products.discount}
                            onChange={(e) => setUpdateDiscount(e.target.value)}
                            className="px-4 py-1 border-2 outline-none rounded bg-bg-input w-full"
                        />
                    </div>

                    <div>
                        <h2 className="text-txt-5E font-semibold pb-2">Free Shipping</h2>
                        
                        <input 
                            type="text" 
                            className="px-4 py-1 border-2 outline-none rounded bg-bg-input w-full"
                            placeholder="true or false"
                            defaultValue={products.freeShipping}
                            onChange={(e => setUpdateFreeShipping(e.target.value))}
                        />
                        
                    </div>

                    <div>
                        <h2 className="text-txt-5E font-semibold pb-2" >Active</h2>

                        <input 
                            type="text" 
                            className="px-4 py-1 border-2 outline-none rounded bg-bg-input w-full"
                            placeholder="true or false"
                            defaultValue={products.status}
                            onChange={(e) => setUpdateStatus(e.target.value)}
                        />
                        
                    </div>

                    <div>
                        <h2 className="text-txt-5E font-semibold pb-2">Color</h2>

                        <input 
                            type="text"
                            placeholder="color"
                            defaultValue={products.color}
                            onChange={(e) => setUpdateColor(e.target.value)}
                            className="px-4 py-1 border-2 outline-none rounded bg-bg-input w-full"
                        />
                    </div>

                    <div>
                        <h2 className="text-txt-5E font-semibold pb-2">Stock</h2>

                        <input 
                            type="number"
                            placeholder="0"
                            min={0}
                            defaultValue={products.stock}
                            onChange={(e) => setUpdateStock(e.target.value)}
                            className="px-4 py-1 border-2 outline-none rounded bg-bg-input w-full"
                        />
                    </div>

                    <div>
                        <h2 className="text-txt-5E font-semibold pb-2">Rating</h2>

                        <input 
                            type="number"
                            placeholder="1-5"
                            min={1}
                            max={5}
                            defaultValue={products.rating}
                            onChange={(e) => setUpdateRating(Number(e.target.value) )}
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
                        onClick={updateProduct}
                        className="px-3 py-[6px] bg-primary text-white text-sm rounded hover:bg-blue-700 hover:text-gray-200 w-full sm:w-fit"
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
                                <span className="px-3">
                                    Update
                                </span>
                            )}
                        </div>
                    
                    </button>
                
                </div>
            </section>
            
            <hr  className="mt-10 mb-10"/>
            {/**General Features */}
            <Features
                id={id}
                features={products?.product_features || []}
            />
        </div>
      </div>

    </>
  )
}
