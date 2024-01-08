'use client'
import useSearchContext from "@/app/hooks/useSearchContext"
import CardProduct from "@/components/CardProduct"
import Image from "next/image"

export default function SearchProducts({searchParams}) {

    const {product} = useSearchContext()
    
  return (
    <>  

        
        <main className="w-full">

            <div className="mb-7">
                <h2 className="font-bold text-2xl text-letter-2">
                    Result: <span>{product.length}</span>
                </h2>
            </div>
            <div className={`${!product ? 'hidden' : 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-5'}`}>

                {product?.map((p, index) => (
                    <CardProduct
                        key={index}
                        id={p.id}
                        title={p.title}
                        discount={p.discount}
                        freeShipping={p.freeShipping}
                        imageUrl={p.imageUrl}
                        price={p.price}
                        rating={p.rating}
                    />
                ))}
            </div>

            {product.length === 0 && (
                <div className="flex flex-col justify-center items-center text-xl font-bold text-letter">

                    <Image 
                        src='/match-not-found.svg'
                        width={200}
                        height={200}
                        alt="not found"
                    />
                    <h3>Not Found Item: <span className="text-primary">{searchParams.productName}</span></h3> 
                </div>
            )}
        </main>
    </>
  )
}
