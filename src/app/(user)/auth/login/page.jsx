'use client'
import { useState } from "react";
import Link from "next/link"
import Image from "next/image";
import { useRouter } from "next/navigation";
import useAuthContext from "@/app/hooks/useAuthContext";
import Alert from "@/components/Alert";
import axiosInstance from "@/components/axiosInstance";

export default function Login() {

  const router = useRouter()
  const {setAuthenticated} = useAuthContext()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [alert, setAlert] = useState({})
  const [loading, setLoading] = useState(false)

  const showAlert = (alert) => {
    setAlert(alert)

    setTimeout(() => {
        setAlert({})
    }, 3000)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if([email, password].includes('')) {
      showAlert({
        message: 'Email & Password are required',
        error: true
      })
      return
    }

    try {
      const {data} = await axiosInstance.post('/users/login', {email, password})

      setLoading(true)
      localStorage.setItem('token', data.token)
      showAlert({
        message: data.msg,
        error: false
      })
      setAuthenticated(data)

      setTimeout(() => {
        router.push('/')
      },3000)

    } catch (error) {
      showAlert({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  const {message, error} = alert

  return (
    <>
      <div className="flex flex-col items-center pt-7">
  
        <h3 className="text-base w-4/5 text-letter font-semibold">Login</h3>

        <form
          onSubmit={handleSubmit} 
          className="flex flex-col gap-3 pt-3 w-4/5"
        >

          <input 
            type="email" 
            name=""
            placeholder="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="bg-bg-input border-2 border-br-input rounded pl-2 text-sm h-8 outline-primary"  
          />

          <input 
            type="password" 
            name=""  
            placeholder="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="bg-bg-input border-2 border-br-input rounded pl-2 text-sm h-8 outline-primary" 
          />

          <div className="h-2 flex flex-col">
            {message && <Alert message={message} error={error}/>}
          </div>

          <button 
            type="submit"
            className="flex justify-center items-center gap-1 text-white text-sm font-medium cursor-pointer bg-primary hover:bg-blue-600 rounded p-2 mt-2"
          >
            Sign In
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
                ''
              )}
            </div>

          </button>
          
        </form>

        <nav
            className="flex flex-col justify-center items-center gap-2 mt-4"
        >
          <Link
            href="/auth"
            className="underline text-xs font-light text-neutral-400"
          >
            Don't you have an account? Register
          </Link>

          <Link
            href="/auth/forgot-password"
            className="underline text-xs font-light text-neutral-400"
          >
            Did you forget your password?
          </Link>
        </nav>
          
      </div>

    </>
  )
}

  