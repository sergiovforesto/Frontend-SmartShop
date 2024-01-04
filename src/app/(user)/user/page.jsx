'use client'
import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Edit, Plus, Trash} from "react-feather"
import axiosInstance from "@/components/axiosInstance"
import ListInfoShipping from "@/components/ListInfoShipping"
import Link from "next/link"

export default function UserConfig() {
  
  const router = useRouter()
  const [information, setInformation] = useState([])
  const [empty, setEmpty] = useState(false)
  const [loading, setLoading] = useState(false)

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
        console.log(error)
        setEmpty(true)
      }
    }

    getInformation()
  }, [])

  console.log(information)
  return (
    <>
      <div className="mb-5">
        <h1 className="text-xl font-bold text-letter">Account</h1>
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

              <div className="flex items-center gap-3">

                <button 
                  type="button"
                  onClick={() => router.push('/user/add-shipping-info')}
                  className={`${!empty ? 'hidden' : 'flex items-center gap-1 text-white text-sm font-semibold bg-primary hover:bg-blue-700 px-5 py-[6px] rounded'}`}
                >
                  <Plus size={18}/>
                </button>

                <Link 
                  href='/user/update-info'
                  className={`${empty ? 'hidden' : 'flex items-center gap-1 text-white text-sm font-semibold bg-secundary px-5 py-[6px] rounded'}`}
                >
                  <Edit size={18}/>
                </Link>

                <Link 
                  href='/user/delete-info'
                  className={`${empty ? 'hidden' : 'flex items-center gap-1 text-white text-sm font-semibold bg-danger px-5 py-[6px] rounded'}`}
                >
                  <Trash size={18}/>
                </Link>
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
                <p>It's empty</p>
              </div>
            )}

            {information.map((info, i) => (
              <ListInfoShipping
                key={i} 
                info={info}
              />
            ))}
            
          </section>
         
        </div>
      </div>
    </>
  )
}
