'use client'
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import Alert from "@/components/Alert"
import axiosInstance from "@/components/axiosInstance"



export default function Register() {


  const [alert, setAlert] = useState({})
  const [registered, setRegistered] = useState(false)
  const [loading, setLoading] = useState(false)
  const [term, setTerm] = useState(false)
  const [user, setUser] = useState({
    name: '',
    lastName: '',
    email: '',
    password: ''
  })

  const showAlert = (alert) => {
    setAlert(alert)

    setTimeout(() => {
        setAlert({})
    }, 3000)
  }

  const registeredView = () => {

    setTimeout(() => {
      setRegistered(true)
      setLoading(true)
    }, 3000)
  }

  
  const resetFields = () => {

    setTimeout(() => {
      setUser({
        name: "",
        lastName: "",
        email: "",
        password: ""
      })

    }, 3000)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if(Object.values(user).includes('')) {
      showAlert({
        message: "All fields are required",
        error: true
      })
      return
    }

    if(user.name.length && user.lastName.length <= 3 ) {
      showAlert({
        message: "Minimum 3 characters",
        error: true
      })
      return
    }

    if(user.password.length <= 6) {
      showAlert({
        message: "The password must have a minimum of 6 characters",
        error: true
      })
      return
    }

    if(!term) {
      showAlert({
        message: "accept the terms and services",
        error: true
      })
      return
    }

    try {
      const {data} = await axiosInstance.post('/users', {
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
      })
      
      setLoading(true)
      showAlert({
        message: data.msg,
        error: false
      })
      resetFields()
      setTerm(false)
      registeredView()
      
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
      {!registered ? (

        <div className="flex flex-col items-center pt-7">
          <h3 className="text-base text-letter font-semibold">Create account</h3>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 pt-3 w-4/5"
          >
            <input 
              type="text" 
              name=""
              placeholder="name"
              className={`${error ? ' bg-bg-input border-2 rounded pl-2 text-sm h-8 border-rose-300' : 'bg-bg-input border-2 border-br-input rounded pl-2 text-sm h-8 outline-primary'}`}
              value={user.name}
              onChange={e => setUser({...user, name: e.target.value})}  
            />

            <input 
              type="text" 
              name=""
              placeholder="last name"
              className={`${error ? ' bg-bg-input border-2 rounded pl-2 text-sm h-8 border-rose-300' : 'bg-bg-input border-2 border-br-input rounded pl-2 text-sm h-8 outline-primary'}`}
              value={user.lastName}
              onChange={e => setUser({...user, lastName: e.target.value})}     
            />

            <input 
              type="email" 
              name=""
              placeholder="email" 
              className={`${error ? ' bg-bg-input border-2 rounded pl-2 text-sm h-8 border-rose-300' : 'bg-bg-input border-2 border-br-input rounded pl-2 text-sm h-8 outline-primary'}`}
              value={user.email}
              onChange={e => setUser({...user, email: e.target.value.toLowerCase()})}    
            />

            <input 
              type="password" 
              name=""  
              placeholder="password"
              className={`${error ? ' bg-bg-input border-2 rounded pl-2 text-sm h-8 border-rose-300' : 'bg-bg-input border-2 border-br-input rounded pl-2 text-sm h-8 outline-primary'}`}
              value={user.password}
              onChange={e => setUser({...user, password: e.target.value})}   
            />

            <div className="h-2 flex flex-col">
              {message && <Alert message={message} error={error}/>}
            </div>

            <div className="flex justify-center gap-2 pt-1">
              <input 
                type="checkbox"
                value={term}
                checked={term}
                onChange={e => setTerm(e.target.checked)}
              />
              <p 
                className={`${error ? 'text-rose-400 text-xs underline' : 'text-neutral-400 text-xs underline'}`}>
                  Accept our terms and Privacy Policy
              </p>
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
                  'Register'
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
              href="/auth/forgot-password"
              className="underline text-xs font-light text-neutral-400"
            >
              Did you forget your password?
            </Link>
          </nav>
            
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <div className="text-center mt-3 flex flex-col gap-2 pt-3 w-4/5">
              <h2 className="font-semibold text-success text-sm">Your account have been created</h2>
              <p className="text-neutral-600 font-semibold text-base">
                Please, check your email to confirm   your account
              </p>

              <Link 
                href='/auth/login'
                className="text-white text-sm cursor-pointer font-medium bg-primary rounded p-2 mt-5"
              >
                Sign in
              </Link>
          </div>
        </div>
      )}
    </>
  )
}

  