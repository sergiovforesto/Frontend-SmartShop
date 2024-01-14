'use client'
import { useState, useEffect } from "react"
import axiosInstance from "@/components/axiosInstance"
import useAuthContext from "@/app/hooks/useAuthContext"
import { useRouter } from "next/navigation"
import MenuUser from "@/components/MenuUser"
import Alert from "@/components/Alert"


export default function UserLayout({children}) {

  const {setAuthenticated} = useAuthContext()
  const [loading, setLoading] = useState(false)
  const [isAuth, setIsAuth] = useState(true)
  const [alert, setAlert] = useState({})
  const router = useRouter()

  const showAlert = (alert) => {
    setAlert(alert)

    setTimeout(() => {
        setAlert({})
    }, 3000)
  }

  useEffect(() => {

    const authUser = async () => {
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
        //crea otra ruta en el backend
        const {data} = await axiosInstance('/users/info-user', axiosConfig)
        setLoading(true)
        setAuthenticated(data)

        showAlert({
          message: data.msg,
          error: false
        })
          
          
      } catch (error) {
        setAuthenticated({})
        setIsAuth(false)
        router.push('/')
      }

      setTimeout(() => {
          setLoading(false)
      }, 2000)
    }

    authUser()

      
  }, [router, setAuthenticated])

  const {message, error} = alert

  return (
    <>  
      {!isAuth ? (
        <div className=" h-screen flex justify-center items-center">
          <div>
            <h2 className="">{message && <Alert message={message} error={error}/>}</h2>
          </div>
        </div>
      ): (
        <div className="flex flex-col sm:flex-row ">
          <div className="sm:sticky sm:max-w-[18rem] top-0 w-full">
            <MenuUser/>      
          </div>

          <div className="w-full px-5 sm:px-10 ">
            <div className="py-5 sm:py-10 ">
              {children}  
            </div> 
          </div>
        </div>
      )}

        
    </>
  )
}

