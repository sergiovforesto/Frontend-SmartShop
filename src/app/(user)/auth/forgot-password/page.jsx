'use client'
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import Alert from "@/components/Alert"
import axiosInstance from "@/components/axiosInstance"


export default function ForgotPassword() {
  const [alert, setAlert] = useState({})
  const [noSent, setNotSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')

  const showAlert = (alert) => {
    setAlert(alert)

    setTimeout(() => {
        setAlert({})
    }, 3000)
  }

  const emailSent = () => {
    setTimeout(() => {
      setNotSent(true)
    },3000)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if(email.length <= 0) {
      showAlert({
        message: 'Email is required',
        error: true
      })
      return
    }

    try {
      const {data} = await axiosInstance.post('users/forgot-password', {email})

      setLoading(true)
      showAlert({
        message: data.msg,
        error: false
      })
      setEmail('')
      emailSent()

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
      {!noSent ? (

        <div className="flex flex-col items-center pt-7">
    
          <h3 className="text-base w-4/5 text-letter font-semibold">Change Password</h3>

          <form
            onSubmit={handleSubmit} 
            className="flex flex-col gap-2 pt-3 w-4/5"
          >

            <input 
              type="email" 
              placeholder="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="bg-bg-input border-2 border-br-input rounded pl-2 text-sm h-8 outline-primary"  
            />

            <div className="h-1 flex flex-col">
              {message && <Alert message={message} error={error}/>}
            </div>

            <button 
              type="submit"
              className="flex justify-center items-center gap-1 text-white text-sm font-medium cursor-pointer bg-primary hover:bg-blue-600 rounded p-2 mt-2"
            >
            
              <div>
                {loading ? (
                  <Image
                      src="/spinner.svg"
                      width={18}
                      height={15}
                      alt="vector"
                      className="animate-spin"
                  />
                ): (
                  'Send email'
                )}
              </div>
            </button>
              
            
          </form>

          <nav
            className="flex flex-col justify-center items-center gap-2 mt-4"
          >
            <Link
              href="/auth/login"
              className="underline text-xs font-light text-neutral-400"
            >
              Do you have an account? Log in
            </Link>

            <Link
              href="/auth"
              className="underline text-xs font-light text-neutral-400"
            >
              ¿Don't you have an account? Register
            </Link>
          </nav>
            
        </div>
      ): (
        <div className="flex justify-center items-center">
          <div className="text-center mt-3 flex flex-col gap-2 pt-3 w-4/5">
              <h2 className="font-semibold text-success text-sm">Check your email</h2>
              <p className="text-neutral-600 font-semibold text-base">
                We have been sent you an email with steps 
              </p>
          </div>
        </div>
      )}
    </>
  )
}

  