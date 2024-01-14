'use client'
import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import axiosInstance from "@/components/axiosInstance"
import Alert from "@/components/Alert"

export default function AddFeatures({params: {id}}) {
  const router = useRouter()

  const [feature_1, setFeature_1] = useState('')
  const [feature_1_value, setFeature_1_value] = useState('')
  const [feature_2, setFeature_2] = useState('')
  const [feature_2_value, setFeature_2_value] = useState('')
  const [feature_3, setFeature_3] = useState('')
  const [feature_3_value, setFeature_3_value] = useState('')
  const [feature_4, setFeature_4] = useState('')
  const [feature_4_value, setFeature_4_value] = useState('')
  const [feature_5, setFeature_5] = useState('')
  const [feature_5_value, setFeature_5_value] = useState('')
  
  

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState({})
  
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
      } catch (error) {
        console.log(error.response)
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

  const createFeature = async() => {
    if
    (
      [
        feature_1, feature_1_value, feature_2, feature_2_value, 
        feature_3 , feature_3_value, feature_4, feature_4_value,
        feature_5, feature_5_value
      ].includes('')) {

      showAlert({
        message: "Can't be empty! please, enter some values",
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
      const feature = await axiosInstance.post(`/features/create/${id}`, {
        first: feature_1,
        firstValue: feature_1_value,
        second: feature_2,
        secondValue: feature_2_value,
        third: feature_3,
        thirdValue: feature_3_value,
        fourth: feature_4,
        fourthValue: feature_4_value,
        fifth: feature_5,
        fifthValue: feature_5_value,

      }, axiosConfig)

      setLoading(true)

      new Promise((resolve) => {
        setTimeout(() => {
          resolve(
            showAlert({
              message: feature.data.msg,
              error: false
            })
          )
        }, 1000)
      })
    
    
      setTimeout(() => {
          router.push(`/admin/products/update/${id}`)
      }, 1200)

    } catch (error) {
      showAlert({
        message: error.response.data.msg,
        error: true
      })
      console.log(error)
    }
  }

  const {message, error} = alert
  const {title} = products
  return (
    <>
      
      <div className="mb-5">
        <h1 className="text-xl font-bold text-letter">Add a new feature:
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
                  value={feature_1}
                  onChange={(e) => setFeature_1(e.target.value)} 
                  placeholder="feature one"
                  className="px-4 py-1 w-full border-2 outline-none rounded bg-bg-input" 
                />
              </div>

              <div className="w-full">
                <p className="text-txt-5E font-semibold pb-2">value</p>
                <input 
                  type="text"
                  value={feature_1_value}
                  onChange={(e) => setFeature_1_value(e.target.value)}  
                  placeholder="value"
                  className="px-4 py-1 w-full border-2 outline-none rounded bg-bg-input" 
                />
              </div>
            </div>

            <div className="flex items-center gap-x-4 gap-y-4">

              <div className="w-full">
                <p className="text-txt-5E font-semibold pb-2">Feature 2</p>
                <input 
                  type="text"
                  value={feature_2}
                  onChange={(e) => setFeature_2(e.target.value)} 
                  placeholder="feature two"
                  className="px-4 py-1 w-full border-2 outline-none rounded bg-bg-input" 
                />
              </div>

              <div className="w-full">
                <p className="text-txt-5E font-semibold pb-2">value</p>
                <input 
                  type="text"
                  value={feature_2_value}
                  onChange={(e) => setFeature_2_value(e.target.value)}  
                  placeholder="value"
                  className="px-4 py-1 w-full border-2 outline-none rounded bg-bg-input" 
                />
              </div>
            </div>


            <div className="flex items-center gap-x-4 gap-y-4">

              <div className="w-full">
                <p className="text-txt-5E font-semibold pb-2">Feature 3</p>
                <input 
                  type="text"
                  value={feature_3}
                  onChange={(e) => setFeature_3(e.target.value)} 
                  placeholder="feature three"
                  className="px-4 py-1 w-full border-2 outline-none rounded bg-bg-input" 
                />
              </div>

              <div className="w-full">
                <p className="text-txt-5E font-semibold pb-2">value</p>
                <input 
                  type="text"
                  value={feature_3_value}
                  onChange={(e) => setFeature_3_value(e.target.value)}  
                  placeholder="value"
                  className="px-4 py-1 w-full border-2 outline-none rounded bg-bg-input" 
                />
              </div>
            </div>


            <div className="flex items-center gap-x-4 gap-y-4">

              <div className="w-full">
                <p className="text-txt-5E font-semibold pb-2">Feature 4</p>
                <input 
                  type="text"
                  value={feature_4}
                  onChange={(e) => setFeature_4(e.target.value)} 
                  placeholder="feature four"
                  className="px-4 py-1 w-full border-2 outline-none rounded bg-bg-input" 
                />
              </div>

              <div className="w-full">
                <p className="text-txt-5E font-semibold pb-2">value</p>
                <input 
                  type="text"
                  value={feature_4_value}
                  onChange={(e) => setFeature_4_value(e.target.value)}  
                  placeholder="value"
                  className="px-4 py-1 w-full border-2 outline-none rounded bg-bg-input" 
                />
              </div>
            </div>


            <div className="flex items-center gap-x-4 gap-y-4">

              <div className="w-full">
                <p className="text-txt-5E font-semibold pb-2">Feature 5</p>
                <input 
                  type="text"
                  value={feature_5}
                  onChange={(e) => setFeature_5(e.target.value)} 
                  placeholder="feature five"
                  className="px-4 py-1 w-full border-2 outline-none rounded bg-bg-input" 
                />
              </div>

              <div className="w-full">
                <p className="text-txt-5E font-semibold pb-2">value</p>
                <input 
                  type="text"
                  value={feature_5_value}
                  onChange={(e) => setFeature_5_value(e.target.value)}  
                  placeholder="value"
                  className="px-4 py-1 w-full border-2 outline-none rounded bg-bg-input" 
                />
              </div>
            </div>

          </div>

          <button 
            type="button"
            onClick={createFeature}
            className="bg-primary px-5 py-[6px] rounded text-white text-sm flex justify-center items-center hover:bg-blue-700 w-full md:w-fit mt-5"
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
              <span>save</span>
            )}
          </button>

          <div className="h-3 flex flex-start mt-3">
            {message && <Alert message={message} error={error}/>}
          </div>

          <p className="text-gray-500 text-sm mt-4">A maximum of 5 features per product</p>

        </div>
      </div>

      
    </>
  )
}
