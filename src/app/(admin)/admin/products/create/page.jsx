'use client'
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import Alert from "@/components/Alert"
import axiosInstance from "@/components/axiosInstance"
import OptionCollection from "@/app/(admin)/components/OptionCollection"


export default function CreateProduct() {
  const router = useRouter()

  const [alert, setAlert] = useState({})
  const [image, setImage] = useState(null)
  const [img, setImg] = useState(null)
  const [loading, setLoading] = useState(false)


  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [discount, setDiscount] = useState('')
  const [freeShipping, setFreeShipping] = useState(false)
  const [color, setColor] = useState('')
  const [stock, setStock] = useState(0)
  const [active, setActive] = useState(false)
  const [rating, setRating] = useState(1)
  const [collection, setCollection] = useState(0)
  const [dataCollection, setDataCollection] = useState([])
  const [collectionEmpty, setCollectionEmpty] = useState('')

  

  useEffect(() => {
    const getCollection = async() => {
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
        const colec = await axiosInstance('/collections', axiosConfig)
        const colection = colec.data.productsByCollection
        setDataCollection(colection)
        return colection

      } catch (error) {
        setCollectionEmpty(error.response.data.msg)
        console.log(error.response.data)
      }
    }

    getCollection()
  },[])

  const handleChange = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      setImage(reader.result);
    };
  };
  const resetForm = () => {
    setTitle('')
    setDescription('')
    setPrice('')
    setDiscount('')
    setFreeShipping(false)
    setColor('')
    setStock(0)
    setActive(true)
    setCollection('')
  }
  const showAlert = (alert) => {
    setAlert(alert)

    setTimeout(() => {
      setAlert({})
    }, 3000)
  }



  const handleSubmit = async (e) => {
    e.preventDefault();

    if([title, description, price, discount, freeShipping, color, stock, active, rating].includes('')){
      showAlert({
        message: 'All fields are required',
        error: true
      })
      return
    }

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

      const imageFile = await axiosInstance.post('/uploads', formData, axiosConfig)
      const imageName = imageFile.data.name;

      const product = await axiosInstance.post('/products', {
        title: title,
        description: description,
        imageUrl: imageName,
        discount: discount,
        freeShipping: freeShipping,
        color: color,
        stock: stock,
        price: price,
        status: active,
        rating: rating,
        collectionId: collection || null
      }, axiosConfig)

      setLoading(true)
      new Promise((resolve) => {
        setTimeout(() => {
          resolve(
            showAlert({
              message: product.data.msg,
              error: false
            })
          )
        }, 1000)
      })

      setTimeout(() => {
        resetForm()
        setImage(null)
        router.push('/admin/products')
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
        <h1 className="text-xl font-bold text-letter">Create Product</h1>

      </div>

      <div className="bg-white border h-full rounded-xl">
        <div className="px-10 py-10">

          <form
            onSubmit={handleSubmit}
          >
            <div>
              <h2 className="text-txt-5E font-semibold pb-2">Title</h2>

              <input
                type="text"
                placeholder="title"
                value={title}
                onChange={(e) =>  setTitle(e.target.value)}
                className="px-4 py-1 border-2 outline-none rounded bg-bg-input w-full"
              />
            </div>

            <div className="mt-10">
              <h2 className="text-txt-5E font-semibold pb-2">Description</h2>

              <textarea
                cols="25" rows="4"
                value={description}
                onChange={(e) =>  setDescription(e.target.value)}
                className="px-4 py-2 border-2 outline-none rounded bg-bg-input w-full"
                placeholder="Description..."
              />

            </div>

            <div className="mt-10">
              <div className="flex justify-between items-center">
                <h2 className="text-txt-5E font-semibold pb-2">Media</h2>
                <button 
                  type="button"
                  onClick={() => [setImg(null), setImage(null)]}
                  className="text-secundary underline"
                >
                  change
                </button>
              </div>

              <div className="flex flex-col justify-center items-center border-2 border-dashed bg-bg-input h-52">
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
            </div>

            <div className="mt-10 grid grid-cols-2 sm:grid-cols-5 gap-x-5 gap-y-6 mb-10">

              <div>
                <h2 className="text-txt-5E font-semibold pb-2">Cost per item</h2>

                <input
                  type="text"
                  placeholder="$0.00"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="px-4 py-1 border-2 outline-none rounded bg-bg-input w-full"
                />
              </div>

              <div>
                <h2 className="text-txt-5E font-semibold pb-2">Discount %</h2>

                <input
                  type="text"
                  placeholder="0%"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  className="px-4 py-1 border-2 outline-none rounded bg-bg-input w-full"
                />
              </div>

              <div>
                <h2 className="text-txt-5E font-semibold pb-2">Free Shipping</h2>

                <div className="flex">

                  <div className="flex items-center gap-2">
                    <label htmlFor="yes" className="">Yes</label>
                    <input
                      type="checkbox"
                      id="yes"
                      checked={freeShipping}
                      onChange={(e) => setFreeShipping(e.target.checked)}
                      className="w-5 h-5"
                    />
                  </div>

                </div>
              </div>

              <div>
                <p className="text-txt-5E font-semibold pb-2" >Active</p>

                <div className="flex items-center gap-2">
                  <label htmlFor="true" className="">true</label>
                  <input
                    type="checkbox"
                    id="true"
                    checked={active}
                    onChange={(e) => setActive(e.target.checked)}
                    className="w-5 h-5"
                  />
                </div>
              </div>

              


              <div>
                <h2 className="text-txt-5E font-semibold pb-2">Collection</h2>

                <div className="flex gap-4">
                  <select
                    className="px-4 py-1 border-2 outline-none rounded bg-bg-input w-full text-txt-5E"
                    value={collection}
                    onChange={(e) => setCollection(Number(e.target.value))}
                  >
                    {collectionEmpty ? (
                      <option value=''>empty</option>
                    ): (
                      dataCollection.map((colec) => (
                        <OptionCollection
                          key={colec.id}
                          id={colec.id}
                          title={colec.title}
                        />
                      ))
                    )}
                  </select>
                </div>
              </div>


              <div>
                <h2 className="text-txt-5E font-semibold pb-2">Color</h2>

                <input
                  type="text"
                  placeholder="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="px-4 py-1 border-2 outline-none rounded bg-bg-input w-full"
                />
              </div>

              <div>
                <h2 className="text-txt-5E font-semibold pb-2">Stock</h2>

                <input
                  type="number"
                  placeholder="0"
                  min={0}
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  className="px-4 py-1 border-2 outline-none rounded bg-bg-input w-full"
                />
              </div>

              <div>
                <h2 className="text-txt-5E font-semibold pb-2">Rating</h2>

                <input
                  type="number"
                  placeholder="1-5"
                  value={rating}
                  max='5'
                  min='1'
                  onChange={(e) => setRating(Math.min(e.target.value, 5) )}
                  className="px-4 py-1 border-2 outline-none rounded bg-bg-input w-full"
                />
              </div>


            </div>

            <div className=''>
              <div className="h-3 flex flex-start mb-2">
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
