'use client'
import React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import Alert from "@/components/Alert"
import axiosInstance from "@/components/axiosInstance"



export default function ConfirmToken({params: {token}}) {

  const [alert, setAlert] = useState({})
  const [accountConfirm, setAccountConfirm] = useState(false)
  
  
  
  useEffect(() => {

    const validToken = async () => {
      try {
        const url = `users/confirm/${token}`
        const {data} = await axiosInstance(url)
  
        setAlert({
          message: data.msg,
          error: false
        })
  
        setAccountConfirm(true)
      } catch (error) {
        setAlert({
          message: error.response.data.msg,
          error: true
        })
        console.log(error)
      }
    }
    validToken()
  },[])

  
  const {message, error} = alert

  return (
    <>
      
      <div className="mt-4">
        <div className="flex justify-center items-center gap-2 text-mini">
          Message: {message && <Alert message={message} error={error}/>}
        </div>
      
        {accountConfirm ? (
          <div className="mt-3 flex">
            <Link 
              href='/auth/login'
              prefetch={false}
              className="text-primary underline text-sm"
            >
              Welcome! Now Sign In here
            </Link>
          </div>
        ): (
          <p className="mt-2 text-primary font-bold">Sorry Token don't valid</p>
        )}

      </div>
    </>
  )
}
