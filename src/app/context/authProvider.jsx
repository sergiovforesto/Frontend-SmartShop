'use client'
import axiosInstance from "@/components/axiosInstance"
import { useState, useEffect, createContext } from "react"
import { redirect } from "next/navigation"

const AuthContext = createContext()

const AuthProvider = ({children}) => {

    
    const [authenticated, setAuthenticated] = useState({})
    const [loading, setLoading] = useState(false)


    useEffect(() => {

        const authUser = async () => {
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
                const {data} = await axiosInstance('/users/profile', axiosConfig)
                setAuthenticated(data)
                
                redirect('/')
            } catch (error) {
                setAuthenticated({})
            }

            setTimeout(() => {
                setLoading(false)
            }, 2000)
        }

        authUser()

        
    }, [])
    
    const cerrarSesionAuth = () => {
        setAuthenticated({})
    }

    return (
        <AuthContext.Provider 
            value={{
                authenticated,
                setAuthenticated,
                loading,
                cerrarSesionAuth
            }}
        >
            {children}
        </AuthContext.Provider>
    )
    
}

export {
    AuthProvider
}

export default AuthContext