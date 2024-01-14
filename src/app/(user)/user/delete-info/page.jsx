'use client'
import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Trash} from "react-feather"
import axiosInstance from "@/components/axiosInstance"
import ListInfoShipping from "@/components/ListInfoShipping"
import Alert from "@/components/Alert"

export default function UserConfig() {
  
  const router = useRouter()
  const [information, setInformation] = useState([])
  const [empty, setEmpty] = useState(false)
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState({})

  useEffect(() => {
    const getInformation = async() => {

      const token = localStorage.getItem('token')
      if(!token) {
        setLoading(false)
        router.push('/')
        return
      }    
      const axiosConfig = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }

      try {
        const info = await axiosInstance('/shipping-info/information', axiosConfig)
        const objectInfo = info.data.userHasInfo
        setInformation([objectInfo])
      } catch (error) {
        console.error(error.response.status)
        setEmpty(true)
      }
    }

    getInformation()
  }, [router])

  const showAlert = (alert) => {
        setAlert(alert)

        setTimeout(() => {
            setAlert({})
        }, 3000)
    }

  const deleteInformation = async() => {
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

        const deleteInfo = await axiosInstance.delete('/shipping-info', axiosConfig)

        new Promise((resolve) => {
          setTimeout(() => {
            resolve(
              showAlert({
                message: deleteInfo.data.msg,
                error: false
              }),
  
            )
          }, 1200)
            
        })

        setTimeout(() => {
            router.push('/user')
        }, 1200)
    } catch (error) {
        
    }
  }

  const {message, error} = alert
  return (
    <>
      <div className="mb-5">
        <h1 className="text-xl font-bold text-letter">Delete Shipping Information</h1>
      </div>
      <div className="bg-white border h-full rounded-xl">
        <div className="px-10 py-8">
          <section>
            
            {/**Shipment information */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-letter-2 font-semibold text-lg underline">
                  Shipment information
                </h3>
              </div>

              
            </div>


            {empty && (
              <div className="flex flex-col justify-center items-center h-[25rem] text-letter-2 font-bold text-lg">
                <Image 
                  src="/Nothing here.svg"
                  width={200}
                  height={200}
                  alt="empty"
                  className="mb-2"
                />
                <p>Empty</p>
              </div>
            )}

            {information.map((info, i) => (
              <ListInfoShipping
                key={i} 
                info={info}
              />
            ))}

            <button 
                type="button"
                onClick={deleteInformation}
                className="bg-danger text-white px-5 py-[6px] rounded mt-5"
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
                    
                    <Trash size={16}/>
                )}
            </button>
            <div className="flex justify-start mt-3">
                {message && <Alert message={message} error={error}/>} 
            </div>
          </section>
         
        </div>
      </div>
    </>
  )
}

