'use client'
import { useState, useEffect } from "react"
import Image from "next/image"
import Alert from "@/components/Alert"
import axiosInstance from "@/components/axiosInstance"
import { resetMoney } from "@/helpers/resetMoney"
import { useRouter } from "next/navigation"

export default function ViewOrder({params: {orderNumber}}) {

    const [order, setOrder] = useState([])
    const [products, setProducts] = useState([])
    const [shipmentInfo, setShipmentInfo] = useState([])
    const [loading, setLoading] = useState(false)
    const [alert, setAlert] = useState(false)
    const router = useRouter()

    const [updateStatus, setUpdateStatus] = useState('')
    const [updateDate, setUpdateDate] = useState('')

    const showAlert = (alert) => {
        setAlert(alert)
    
        setTimeout(() => {
          setAlert({})
        }, 3000)
    }

    useEffect(() => {
        const getUserOrder = async() => {
            const token = localStorage.getItem('token')
            if(!token) {
                setLoading(false)
                return
            }
  
            const axiosConfig = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
            }

            try {
                const order = await axiosInstance(`/orders/admin/${orderNumber}`, axiosConfig)
                const objectOrder = order.data?.order
                const objectProducts = order.data?.order?.products
                const objectShipmentInfo = order.data?.shippingInfo
                setOrder(objectOrder)
                setProducts(objectProducts)
                setShipmentInfo(objectShipmentInfo)
            } catch (error) {
                console.log(error)
            }
        }

        getUserOrder()
    }, [orderNumber])

    const updateDeliveryDate = async() => {
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
            const updateOrder = await axiosInstance.put(`/orders/admin/update/${orderNumber}`, {
                status: updateStatus || order.status,
                dateDelivery: updateDate || order.dateDelivery
            }, axiosConfig)

            setLoading(true)

            new Promise((resolve) => {
                setTimeout(() => {
                  resolve(
                    showAlert({
                      message: updateOrder.data.msg,
                      error: false
                    })
                  )
                }, 1000)
            })
            
            
            setTimeout(() => {
                router.push('/admin/orders')
            }, 1200)
        } catch (error) {
            console.log(error)
        }
    }


    const {message, error} = alert

  return (
    <>
        <div className="mb-5">
            <h1 className="text-xl font-bold text-letter">Order#: {orderNumber}</h1>

        </div>

        <div className="bg-white border h-full rounded-xl">
            <div className="px-10 py-10">
                <section>
                    <div className="flex flex-col gap-5 justify-between xl:flex-row">
                        <div className="xl:w-[50%]">
                            <div className="text-letter-2 font-semibold text-lg mb-2">
                                <h3>Shipment information</h3>
                            </div>

                            <div className="border px-5 py-7 rounded-md flex flex-col gap-2">
                                <div className="flex justify-between items-center text-letter-2">
                                    <p className="font-bold underline">Address: </p>
                                    <p className="text-secundary">{shipmentInfo.address}</p>
                                </div>

                                <div className="flex justify-between items-center">
                                    <p className="font-bold underline">Country: </p>
                                    <p className="text-secundary">{shipmentInfo.country}</p>
                                </div>

                                <div className="flex justify-between items-center">
                                    <p className="font-bold underline">City: </p>
                                    <p className="text-secundary">{shipmentInfo.city}</p>
                                </div>

                                <div className="flex justify-between items-center">
                                    <p className="font-bold underline">State: </p>
                                    <p className="text-secundary">{shipmentInfo.state}</p>
                                </div>

                                <div className="flex justify-between items-center">
                                    <p className="font-bold underline">Phone: </p>
                                    <p className="text-secundary">{shipmentInfo.phone}</p>
                                </div>

                                <div className="flex justify-between items-center">
                                    <p className="font-bold underline">Zip Code: </p>
                                    <p className="text-secundary">{shipmentInfo.zipCode}</p>
                                </div>
                            </div>
                        </div>

                        <div className="xl:w-[50%]">
                            <div className="text-letter-2 font-semibold text-lg mb-2">
                                <h3>Purchase information</h3>
                            </div>

                            <div className="border rounded-lg">
                                <div className="flex justify-between p-5">
                                    <Image 
                                        src='/smart-logo.svg'
                                        width={130}
                                        height={130}
                                        alt="logo"
                                    />

                                    <p className="font-bold text-sm">
                                        Date: <span className="font-normal">{order.dateOrder}</span>
                                    </p>
                                </div>

                                <div className="text-letter-2">
                                    <div className="flex items-center justify-between px-5 bg-slate-100 py-[6px]">
                                        <p className="font-bold">Description</p>
                                        <p className="font-bold">Price</p>
                                    </div>

                                    <div className="px-5 py-[6px] text-letter-2 mt-2">
                                        {products?.map((product, index) => (
                                            <div key={index}>
                                                <div
                                                    className="flex items-center justify-between"
                                                >
                                                    <div className="flex items-center gap-5">
                                                        <p>{product.name}</p>
                                                        <p>x{product.quantity}</p>
                                                    </div>

                                                    <p>{product.price}</p>

                                                </div>

                                                <hr className="mt-3 mb-3"/>

                                                <div className="text-letter-2">
                                                    <div className="flex items-center justify-between">

                                                        <p className="font-bold">SubTotal:</p>
                                                        <p>{resetMoney(order.subTotal )}</p>
                                                    </div>

                                                    <div className="flex items-center justify-between">
                                                        <p className="font-bold">Total: </p>
                                                        <p>{resetMoney(order.total )}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>          
                        </div>
                    </div>

                    <div className="flex items-center gap-2 mt-7">
                        <p className="font-bold text-letter-2 text-lg">Current Status:</p>
                        <p className="text-primary">{order.status}</p>
                    </div>

                    <div className="flex items-center gap-2 mt-1">
                        <p className="font-bold text-letter-2 text-lg">Current Delivery Date:</p>
                        <p className="text-primary">{order.dateDelivery}</p>
                    </div>


                    {/**Update */}
                    <div className="flex flex-col gap-5 items-end xl:flex-row mt-7">
                        <div className="w-full">

                            <p className="font-semibold">Order Status</p>

                            <div className="flex items-center gap-2 mt-2">
                                <select
                                    onChange={(e) => setUpdateStatus(e.target.value)}
                                    className="px-4 py-1 border-2 outline-none rounded bg-bg-input w-full"
                                >   
                                    <option value="pending">pending</option>
                                    <option value="shipped">shipped</option>
                                    <option value="delivered">delivered</option>
                                    <option value="cancelled">cancelled</option>
                                </select>
                                
                            </div>
                        </div>

                        <div className="w-full text-letter-2">
                            <p className="font-semibold">Delivery Date</p>
                            <div className="flex items-center gap-2 mt-2">
                                <input 
                                    type="date"
                                    value={updateDate}
                                    onChange={(e) => setUpdateDate(e.target.value)}
                                    className="px-4 py-1 border-2 outline-none rounded bg-bg-input w-full" 
                                />
                                
                            </div>
                        </div>

                        <button 
                            type="button"
                            onClick={updateDeliveryDate}
                            className="bg-primary text-white text-sm py-[6px] px-4 rounded"
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
                                        update
                                    </span>
                                )}
                            </div>
                        </button>  
                    </div>

                    <div className="flex mb-2">
                        {message && <Alert message={message} error={error}/>}
                    </div>
                </section>
            </div>
        </div>
    </>
  )
}
