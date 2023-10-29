'use client'
import Image from "next/image"
import { useState } from "react"
import Features from "@/app/(admin)/components/Features"

export default function Invetory() {

  const [image, setImage] = useState('')
  const [product, setProduct] = useState({
    title: '',
    description: '',
    media: image,
    cost: '',
    discount: '',
    freeShipping: false,
    color: '',
    stock: 0,
    active: true
  })
  const [collection, setCollection] = useState('')

  const handleChange = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      setImage(reader.result);
    };
  };

  

  

  return (
    <>
      <div className="mb-10">
        <h1 className="text-xl font-bold text-letter">Inventory</h1>
      </div>
      <div className="bg-white shadow-xl h-full rounded-xl">
        <div className="px-10 py-10">
          
          <div>
            <h2 className="text-txt-5E font-semibold pb-2">Title</h2>

            <input 
              type="text"
              placeholder="Iphone"
              value={product.title}
              onChange={(e) => setProduct({...product, title: e.target.value})}
              className="px-4 py-1 border-2 outline-none rounded bg-bg-input w-full"
            />
          </div>

          <div className="mt-10">
            <h2 className="text-txt-5E font-semibold pb-2">Description</h2>

            <textarea 
              cols="25" rows="4"
              value={product.description}
              onChange={(e) => setProduct({...product, description: e.target.value})}
              className="px-4 py-2 border-2 outline-none rounded bg-bg-input w-full"
              placeholder="Description..."
            />
            
          </div>

          <div className="mt-10">
            <h2 className="text-txt-5E font-semibold pb-2">Media</h2>
            
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
                  <label htmlFor="media" className="cursor-pointer hover:bg-slate-100 rounded">
                    <Image
                      src='/upload-image.png'
                      width={40}
                      height={40}
                      alt="upload"
                    />
                  </label>

                  <input 
                    type="file"
                    value={product.media}
                    onChange={(e) => setProduct({...product, media: e.target.value}, 
                      setImage(handleChange(e)))}
                    id="media"
                    accept="image/*"
                    className=" opacity-0"
                  />
                
                </>
              )}

            </div>
          </div>

          <div className="mt-10 grid grid-cols-4 gap-10">

            <div>
              <h2 className="text-txt-5E font-semibold pb-2">Cost per item</h2>

              <input 
                type="text"
                placeholder="1000"
                value={product.cost}
                onChange={(e) => setProduct({...product, cost: e.target.value})}
                className="px-4 py-1 border-2 outline-none rounded bg-bg-input w-full"
              />
            </div>

            <div>
              <h2 className="text-txt-5E font-semibold pb-2">Discount %</h2>

              <input 
                type="text"
                placeholder="15%"
                value={product.discount}
                onChange={(e) => setProduct({...product, discount: e.target.value})}
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
                    checked={product.freeShipping}
                    onChange={(e) => setProduct({...product, freeShipping: e.target.checked})}
                    className="w-5 h-5"
                  />
                </div>

              </div>
            </div>


            <div>
              <h2 className="text-txt-5E font-semibold pb-2">Collection</h2>

              <input 
                type="text"
                placeholder="collection"
                value={collection}
                onChange={(e) => setCollection(e.target.value)}
                className="px-4 py-1 border-2 outline-none rounded bg-bg-input w-full"
              />
            </div>


            <div>
              <h2 className="text-txt-5E font-semibold pb-2">Color</h2>

              <input 
                type="text"
                placeholder="blue"
                value={product.color}
                onChange={(e) => setProduct({...product, color: e.target.value})}
                className="px-4 py-1 border-2 outline-none rounded bg-bg-input w-full"
              />
            </div>

            <div>
              <h2 className="text-txt-5E font-semibold pb-2">Stock</h2>

              <input 
                type="number"
                placeholder="0"
                value={product.stock}
                onChange={(e) => setProduct({...product, stock: Number(e.target.value)})}
                className="px-4 py-1 border-2 outline-none rounded bg-bg-input w-full"
              />
            </div>

            <div>
              <p className="text-txt-5E font-semibold pb-2" >Active</p>

              <div className="flex items-center gap-2">
                  <label htmlFor="true" className="">true</label>
                  <input 
                    type="checkbox"
                    id="true"
                    checked={product.active}
                    onChange={(e) => setProduct({...product, active: e.target.checked})}
                    className="w-5 h-5"
                  />
              </div>
            </div>
          </div>
          <div className="mt-12">
            <button 
              type="submit"
              className="px-6 py-2 bg-primary font-semibold text-white rounded-md hover:bg-blue-700 hover:text-gray-200"
            >
              Create Product
            </button>
          </div>
        </div>

        <div className="px-10 py-10 hidden">

          <Features/>

        </div>
      </div>
    </>
  )
}
