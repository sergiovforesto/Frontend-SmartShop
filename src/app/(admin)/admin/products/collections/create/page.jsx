'use client'
import { useState } from "react"
import Alert from "@/components/Alert"
import Image from "next/image"
import { useRouter } from "next/navigation"
import axiosInstance from "@/components/axiosInstance"

export default function CreateCollection() {
  const router = useRouter()

  const [alert, setAlert] = useState({})
  const [loading, setLoading] = useState(false)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  
  const resetForm = () => {
    setTitle('')
    setDescription('')
  }

  const showAlert = (alert) => {
    setAlert(alert)

    setTimeout(() => {
        setAlert({})
    }, 3000)
  }

  const handleSubmit = async(e) => {
    e.preventDefault();

    if(title.length >= 80 ) {
      showAlert({
        message: "Title it's very long",
        error: true
      })
      return

    } else if( title.length <= 2) {
      showAlert({
        message: "Title it's very short",
        error: true
      })
      return
    }

    if([title, description].includes('')){
      showAlert({
        message: 'All fields are required',
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
      
      const {data} = await axiosInstance.post('/collections', {
        title: title,
        description: description,
      }, axiosConfig)
      
      setLoading(true)
      new Promise((resolve) => {
        setTimeout(() => {
          resolve(
            showAlert({
              message: data.msg,
              error: false
            })
          )
        }, 1000)
      })
      
      setTimeout(() => {
        resetForm()
        router.push('/admin/products/collections')
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

  return (
    <>
      <div className="mb-5">
        <h1 className="text-xl font-bold text-letter">Create Collection</h1>
      </div>
      <div className="bg-white border h-full rounded-xl">
        <div className="px-10 py-8">
          <form 
            onSubmit={handleSubmit}
          >
            <div>
              <h2 className="text-txt-5E font-semibold pb-2">Title</h2>

              <input 
                type="text"
                placeholder="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="px-4 py-1 border-2 outline-none rounded bg-bg-input w-full"
              />
            </div>

            <div className="mt-5">
              <h2 className="text-txt-5E font-semibold pb-2">Description</h2>

              <textarea 
                cols="25" rows="4"
                className="px-4 py-2 border-2 outline-none rounded bg-bg-input w-full"
                placeholder="Description..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              
            </div>
              
            <div className='mt-2'>
              <div className="h-4 flex flex-start mb-2">
                {message && <Alert message={message} error={error}/>}
              </div>
              <button 
                type="submit"
                className="px-5 py-[6px] bg-primary font-semibold text-white text-sm rounded hover:bg-blue-700 hover:text-gray-200 w-full sm:w-fit"
              >
                <div>
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
                  ): (
                    <span>
                      Create
                    </span>
                  )}
                </div>
                
              </button>
            </div>
          </form>
         
        </div>
      </div>
    </>
  )
}
