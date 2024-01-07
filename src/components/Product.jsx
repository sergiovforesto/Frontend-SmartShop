'use client'
import Image from "next/image"
import { resetMoney } from "@/helpers/resetMoney"

export default function Product({products}) {


  return (
    <div className="border rounded-lg flex items-center px-3">
        <div className="">
            <Image 
                src={`http://localhost:5000/api/v1/uploads/${products.image}`}
                width={140}
                height={140}
                alt="img-cart"
                className="rounded-lg"
            />
        </div>

        <div className="ml-5 py-3 w-full">
            <div className="flex justify-between">

                <h2 className="text-letter-2 font-semibold">{products.name}</h2>
                
            </div>
            <p className=" text-letter-2">
                USD:{' '} 
                <span className="">{resetMoney(products.price)}</span> 
            </p>

            <p className="font-semibold text-success text-[12px] mt-1 mb-1">
                <span className="font-normal">{products.discount}% OFF</span> 
            </p>

            <p className="font-semibold text-letter-2 text-sm">
                color:{' '}
                <span className="font-normal">{products.color}</span> 
            </p>

            <p className="font-semibold text-letter-2 text-sm">
                quantity:{' '}
                <span className="font-normal">{products.quantity}</span> 
            </p>
        </div>
    </div>
  )
}
