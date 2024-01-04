'use client'
import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Alert from "@/components/Alert"
import axiosInstance from "@/components/axiosInstance"

export default function ImageUpdate({params: {id, imageUrl}}) {
    const router = useRouter()

    const [alert, setAlert] = useState({})
    const [image, setImage] = useState(null)
    const [img, setImg] = useState(null)
    const [loading, setLoading] = useState(false)

    const showAlert = (alert) => {
        setAlert(alert)
    
        setTimeout(() => {
            setAlert({})
        }, 3000)
    }

    const handleChange = (e) => {
        const file = e.target.files[0];
    
        const reader = new FileReader();
    
        reader.readAsDataURL(file);
    
        reader.onload = () => {
          setImage(reader.result);
        };
    };

    const updateImage = async() => {
        if(!img) {
            showAlert({
                message: "Can't be empty",
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
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`
            }
        }

        const formData = new FormData()
        formData.append('img', img)
        try {
            const updateImg = await axiosInstance.put(`/uploads/${imageUrl}`, formData, axiosConfig)
            const imageName = updateImg.data.newImage

            const updateImgProduct = await axiosInstance.put(`/products/${id}`, {
                imageUrl: imageName
            }, axiosConfig)

            setLoading(true)
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve(
                        showAlert({
                            message: updateImgProduct.data.msg,
                            error: false
                        })
                    )
                }, 1000)
            })

            setTimeout(() => {
                router.push(`/admin/products/update/${id}`)
            }, 1200)
            
        } catch (error) {
            console.log(error.response.data)
        }
    }

    const {message, error} = alert
  return (
    <>
      <div className="mb-5">
        <h1 className="text-xl font-bold text-letter">Updated Image: </h1>
      </div>
      <div className="bg-white border h-full rounded-xl">
        <div className="px-10 py-8">
            <div className="">
                <h2 className="text-txt-5E font-semibold pb-2">
                    Media
                </h2>

                <div 
                    className={`${error ? 'flex flex-col justify-center items-center border-2 border-dashed bg-bg-input h-52 border-rose-400' : 'flex flex-col justify-center items-center border-2 border-dashed bg-bg-input h-52'}`}
                >
                    {image ? (
                        <>
                            <div>
                                <Image
                                    src={image}
                                    width={150}
                                    height={150}
                                    alt="img"
                                />
                            </div>
                        </>
                    ) : (
                        <>
                            <label htmlFor="img" className="cursor-pointer hover:bg-slate-100 rounded">
                                <Image
                                    src='/upload-image.png'
                                    width={40}
                                    height={40}
                                    alt="upload"
                                />
                            </label>

                            <input
                                type="file"
                                onChange={(e) => setImg(e.target.files[0], handleChange(e))}
                                id="img"
                                name="img"
                                accept="image/*"
                                className=" opacity-0"
                            />

                        </>
                    )}

                </div>
                
                <div className="h-3 flex flex-start mb-2 mt-3">
                    {message && <Alert message={message} error={error}/>}
                </div>
                <button
                    type="submit"
                    onClick={updateImage}
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
                    <span> Save </span>
                  )}
                </div>

              </button>
            </div>
         
        </div>
      </div>
    </>
  )
}
