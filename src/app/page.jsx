'use client'
import Image from "next/image"
import Nav from "@/components/Nav"
import Footer from "@/components/Footer"
import CardProduct from "@/components/CardProduct"
import {Frown} from 'react-feather'
import Link from "next/link"
import { useState, useEffect } from "react"
import { GetProducts } from "@/lib/dataProducts"

export default function Home() {

  const [products, setProducts] = useState([])
  useEffect(() => {

    const getProducts = async() => {

      try {
        const data = await GetProducts()
        const objectProduct = data?.products
        setProducts(objectProduct)
        return objectProduct
      } catch (error) {
        console.log(error.response.data)
      }
    }

    getProducts()
  }, [])

  
  
  return (
    <>
      <header className="sticky z-10">
        <Nav/>  
      </header>

      <section className="imagen-prueba">
        <div className="flex justify-center items-center h-[18rem]">
          <div className="bg-white md:w-[42rem] w-[30rem] rounded-md px-7 py-7 border">
            <div className="flex justify-between gap-6">
              <div className="flex gap-6 items-center">
                
                <Image src="/publicidad.png" width={90} height={95} className="md:w-[140px] md:h-[140px]" alt="img"/>

                <div className="flex flex-col justify-center gap-4">

                  <h1 className="font-bold text-letter-2 md:text-lg text-[12px] md:w-[13rem] w-[8rem]">
                    Save 15% on the iPhone 14 Pro Max!
                  </h1>

                  <Link href={`/view-product/1`} className="bg-secundary hover:bg-secundary-hover text-white text-center font-semibold w-fit px-4 py-2 md:text-sm text-[12px] rounded-2xl">
                    Buy now
                  </Link>
                </div>

              </div>

              <Image src="/iphone-14.webp" width={90} height={95} className="md:w-[140px] md:h-[140px]" alt="img2"/>

            </div>
          </div>
        </div>
      </section>
      
      {/*Products */}
      <main className="mt-10 mb-10 px-7">
        <h2
          className="font-bold text-2xl text-letter-2" 
        > 
          Products 
        </h2>

        <section className="grid grid-cols-1 sm:gap-x-5 gap-y-7 sm:gap-y-12 sm:grid-cols-2 md:grid-cols-5 xl:grid-cols-6 grid-rows-2 mt-10">
          {products?.map((product) => (
            
            <CardProduct
              key={product.id}
              id={product.id}
              title={product.title}
              discount={product.discount}
              price={product.price}
              rating={product.rating}
              imageUrl={product.imageUrl}
              color={product.color}
              freeShipping={product.freeShipping}
            />
          ))}

        </section>
        {!products && (
          <div className="flex justify-center items-center gap-2">
            <p className="text-center text-2xl text-primary font-bold">Empty</p>
            <Frown color="gold" size={24}/>
          </div>
        )}
        
        <div className={!products ? 'hidden' : 'flex justify-center mt-7'}>
          <Link 
            href=''
            className="text-primary text-sm font-semibold px-4 py-2 bg-white rounded-xl border hover:text-blue-600 hover:underline"
          >
            show more
          </Link>
        </div>
      </main>
      
      {/*How to buy */}
      <section 
        className="border-t border-b bg-white py-10"
      >
        <div className="flex justify-center items-center">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-10 h-full w-[70%]">
            <div className="flex flex-col items-center">
              <Image
                src='/shop-online.svg'
                width={140}
                height={140}
                alt="img1"
                className="w-auto h-auto max-w-[150px]"
              />

              <div className="flex flex-col items-center text-center mt-6">
                <h3 className="font-bold text-letter-2 mt-2">Buy without moving</h3>
                <p className="text-sm w-[90%]">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <Image
                src='/Delivery at door.svg'
                width={110}
                height={110}
                alt="img2"
                className="w-auto h-auto max-w-[150px]"
              />

              <div className="flex flex-col items-center text-center mt-6">
                <h3 className="font-bold text-letter-2 mt-2">Receive your product</h3>
                <p className="text-sm w-[90%]">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <Image
                src='/Win gifts.svg'
                width={150}
                height={150}
                alt="img3"
                className="w-auto h-auto max-w-[150px]"
              />

              <div className="flex flex-col items-center text-center mt-6">
                <h3 className="font-bold text-letter-2 mt-2">Enjoy your purchase</h3>
                <p className="text-sm w-[90%]">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/*Categories */}
      <section
        className="pb-8 mt-8 sm:h-[20rem]"
      >
        <div className="sm:h-full flex flex-col items-center justify-center">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-letter-2">categories</h3>
          </div>

          <div className="flex flex-col gap-8 sm:gap-2 items-center sm:flex-row justify-around w-[50%]">
            <Image 
              src='/categoria-pc.svg'
              width={120}
              height={120}
              alt="pc"
              className="hover:cursor-pointer w-auto h-auto max-w-[120px]"
            />

            <Image 
              src='/categoria-mobile.svg'
              width={120}
              height={120}
              alt="mobile"
              className="hover:cursor-pointer w-auto h-auto max-w-[120px]"
            />

            <Image 
              src='/categoria-wt.svg'
              width={120}
              height={120}
              alt="watch"
              className="hover:cursor-pointer w-auto h-auto max-w-[120px]"
            />

            <Image 
              src='/categoria-games.svg'
              width={120}
              height={120}
              alt="games"
              className="hover:cursor-pointer w-auto h-auto max-w-[120px]"
            />
          </div>
        </div>
      </section>
        

      <Footer />
    </>
  )
}
