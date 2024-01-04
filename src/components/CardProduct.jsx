'use client'
import Image from "next/image"
import {Star} from 'react-feather'
import { generateStar } from "@/helpers/generateStar";
import { resetMoney } from "@/helpers/resetMoney";
import Link from "next/link";

export default function CardProduct({
    id, title, discount, freeShipping,
    imageUrl, price, rating,
    
}) {
    const pathImg = `${process.env.NEXT_PUBLIC_BACK_END}/api/v1/uploads/${imageUrl}`

  return (
    <>
        <Link 
            className="bg-white rounded-md shadow md:max-w-[200px] hover:cursor-pointer"
            href={`/view-product/${id}`}
            
        >
            <div className="flex md:flex-col items-center w-full h-full md:justify-center">
                <div className="mb-2 w-full flex justify-center">
                    <Image 
                        src={pathImg}
                        width={120}
                        height={100}
                        alt="img"
                        className="w-auto h-auto"
                    />
                </div>

                <div className="mt-4 px-5 py-1 w-full">
                    <div className="h-full flex flex-col items-center">
                        <div className="mb-2 w-full">
                            <p className="text-letter hover:text-primary hover:underline">{title}</p>
                        </div>
            
                        <div className="w-full">
                            <div className="flex justify-between">
                                <div className="flex">
                                    {generateStar(rating, 
                                        <Star size={14} color="gold" fill="gold"/>  
                                    )}
                                </div>
                                <span className="text-success text-sm">{discount === 0 ? '' : discount + '%'}</span>
                            </div>
                            <div className="mt-2">
                                <span className="text-letter font-semibold">USD:{resetMoney(price)}</span>
                            </div>

                            <div className="mt-2 mb-3">
                                <span className="text-success text-sm">{freeShipping ? 'free Shipping' : ''}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </Link>
    </>
  )
}
