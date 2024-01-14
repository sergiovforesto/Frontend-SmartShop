import { useState } from "react"
import { ShoppingCart } from "react-feather"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { resetMoney } from "@/helpers/resetMoney"
import useCartContext from "@/app/hooks/useCartContext"

export default function Cart() {

  const {cart} = useCartContext()
  const [show, setShow] = useState(false)
  const [loading, setLoding] = useState(true)
  const router = useRouter()

  return (
    <>
      <div
        onClick={() => [setShow(!show), setLoding(true)]}
        className="flex items-center cursor-pointer"
      >
        <span className={`${cart.length === 0 ? 'hidden' : 'text-micro absolute right-0 top-0 bg-success text-white rounded-full px-1 py-mini'} `}>
          {cart.length}
        </span>
        <ShoppingCart className="text-txt-5E hover:text-slate-400 w-6"/>
        
        <div
          className={`${show ? 'bg-white shadow-xl p-2 h-[8rem] w-[20rem] absolute top-[52px] -left-56 sm:-left-52 z-10 overflow-y-auto rounded-sm' : 'hidden'}`}
        >
          <div className="flex h-full flex-col items-start ">
            {cart.length === 0 && (
              <div 
                className="h-full w-full flex flex-col justify-center items-center"
                onClick={() => router.push('/user/cart')}
              >
                <Image
                  src='/empty-cart.png'
                  width={100}
                  height={100}
                  alt="img"
                />
                <p className="text-sm text-letter-2">Empty</p>
              </div>
            )}

            {cart?.map((product, index) => (
              <Link
                key={index} 
                href='/user/cart'
                className="flex gap-2 items-center border-b w-full mb-4"
              >
                <div>
                  <Image
                    src={`http://localhost:5000/api/v1/uploads/${product.image}`}
                    width={100}
                    height={100}
                    alt="img"
                  />
                </div>

                <div className="h-full ">
                  <p className="font-bold text-sm leading-8 text-letter-2">{product.name}</p>
                  <p className="font-semibold text-sm text-letter-2">
                    price: <span className="font-normal">{resetMoney(product.price)}</span>
                  </p>
                  <p className="font-semibold text-sm text-letter-2">
                    quantity: <span className="font-normal">{product.quantity}</span>
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      
    </>
  )
}
