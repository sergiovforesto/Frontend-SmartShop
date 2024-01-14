'use client'
import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Alert from "@/components/Alert"
import axiosInstance from "@/components/axiosInstance"

export default function NewPassword({params : {token}}) {

    const router = useRouter()

    const [alert, setAlert] = useState({})
    const [validToken, setValidToken] = useState(false)
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')

    const showAlert = (alert) => {
        setAlert(alert)
    
        setTimeout(() => {
            setAlert({})
        }, 2000)
    }

    const redirectLogin = () => {
        setTimeout(() => {
            router.push('/auth/login')
        },3000)
    }

    const resetFileds = () => {
        setTimeout(() => {
            setPassword('')
            setRepeatPassword('')
        }, 2000)
    }

    useEffect(() => {

        const validToken = async () => {
            try {
                await axiosInstance(`/users/forgot-password/${token}`)
                setValidToken(true)

            } catch (error) {
                showAlert({
                    message: error.response.data.msg,
                    error: true
                })
                console.log(error)
            }
        }
        validToken()
    },[token])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if([password, repeatPassword].includes('')) {
            showAlert({
                message: 'All fields are required',
                error: true
            })
            return
        }

        if(password !== repeatPassword) {
            showAlert({
                message: 'Passwords do not match',
                error: true
            })
            return
        }

        try {
            const {data} = await axiosInstance.post(`users/forgot-password/${token}`, {password})

            showAlert({
                message: data.msg,
                error: false
            })
            resetFileds()
            redirectLogin()

        } catch (error) {
            showAlert({
                message: error.response.data.msg,
                error: true
            })
            console.log(error)
        }
    }


    const {message, error} = alert
  return (
    <>  
        {validToken ? (

            <div className="flex flex-col items-center pt-7">
            
                <h3 className="text-base w-4/5 text-letter font-semibold">
                    New password
                </h3>

                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-3 pt-3 w-4/5"
                >

                    <input 
                        type="password" 
                        placeholder="new password"
                        value={password}
                        onChange={e => setPassword(e.target.value)} 
                        className="bg-bg-input border-2 border-br-input rounded pl-2 text-sm h-8 outline-primary"  
                    />

                    <input 
                        type="password" 
                        placeholder="repeat password"
                        value={repeatPassword}
                        onChange={e => setRepeatPassword(e.target.value)}
                        className="bg-bg-input border-2 border-br-input rounded pl-2 text-sm h-8 outline-primary" 
                    />

                    <div className="h-1 flex flex-col">
                        {message && <Alert message={message} error={error}/>}
                    </div>

                    <input 
                        type="submit" 
                        value="Save"
                        className="text-white text-sm cursor-pointer font-medium bg-primary rounded p-2 mt-2" 
                    />
                
                </form>

                <nav
                    className="flex flex-col justify-center items-center gap-2 mt-4"
                >
                    <Link
                        href="/auth"
                        className="underline text-xs font-light text-neutral-400"
                        >
                        Dont you have an account? Register
                    </Link>

                    <Link
                        href="/auth/login"
                        className="underline text-xs font-light text-neutral-400"
                    >
                        Do you have an account? Log in
                    </Link>
                </nav>
                
            </div>
        ): (
            <div className="flex justify-center items-center mt-5">
                <p className="text-danger font-bold">Token Doesn&apost exists</p>
            </div>
        )}
    </>
  )
}
