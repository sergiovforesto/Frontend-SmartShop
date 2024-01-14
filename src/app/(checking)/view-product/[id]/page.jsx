'use client'
import { useState, useEffect } from "react"
import { Heart, Star, Minus, Plus, Send } from "react-feather"
import Image from "next/image"
import Alert from "@/components/Alert"
import { useRouter } from "next/navigation"
import ViewFeatures from "@/components/tableFeature"
import { GetProductId } from "@/lib/dataProducts"
import { resetMoney } from "@/helpers/resetMoney"
import { generateStar } from "@/helpers/generateStar"
import useCartContext from "@/app/hooks/useCartContext"


export default function ViewProduct({params: {id}}) {

    const {quantity, setQuantity, addToCart, total, totalAmount, subtotal, subTotalAmount} = useCartContext()

    const [alert, setAlert] = useState({})
    const [loading, setLoading] = useState(false)
    const [img, setImg] = useState()
    const [heart, setHeart] = useState('none')
    const router = useRouter()

    let nextId = 0;
    const [arrayComments, setArrayComments] = useState([])
    const [comment, setComment] = useState('')

    const [products, setProducts] = useState([])
    const [features, setFeatures] = useState([])
    const pathImg = `${process.env.NEXT_PUBLIC_BACK_END}/api/v1/uploads/${img}`

    

    useEffect(() => {
        const getProduct = async() => {

            try {
                setLoading(true)
                const data = await GetProductId(id)
                const arrayFeatures = data.product_features
                const urlImg = data.imageUrl
                setFeatures(arrayFeatures)
                setImg(urlImg)
                setProducts(data)
                setLoading(false)
            } catch (error) {
                console.log(error)
            }
        }
        getProduct()
    }, [id])

       

    const checkInSctock = (totalQuantity, stock) => {
        if(totalQuantity <= stock) {
            return quantity
        } else if(totalQuantity >= stock){
            return setQuantity(stock)
        }
    }
    
    

    const showAlert = (alert) => {
        setAlert(alert)
    
        setTimeout(() => {
            setAlert({})
        }, 3000)
    }

    
    const addComment = () => {
        if(comment === '') {
            showAlert({
                message: "Can't be empty",
                error: true
            })
            return
        }
        
        setArrayComments([...arrayComments, { id: nextId++, comment: comment }]);
        setComment('')
    }
    
    totalAmount(quantity, products.price, products.discount)
    subTotalAmount(quantity, products.price)

  const {message, error} = alert

  
  return (
    <> 
        <section className="md:w-[60%] xl:w-[65%]">
            <div className="flex justify-center items-center">
                <Image 
                    src={pathImg}
                    width={300}
                    height={300}
                    alt="image view product"
                />
            </div>


            <div className="mt-16">
                <h3 className="text-letter-2 font-bold text-lg mb-2">Description</h3>

                <p className="text-letter-2">
                    {products.description}
                </p>
            </div>

            <hr className="mt-10"/>

            <div className="mt-10">
                <ViewFeatures features={features}/>
            </div>

            <div className="mt-10">
                <h3 className="text-letter-2 font-bold text-lg mb-2">
                    Questions & Answers
                </h3>
                
                <p className="text-letter-2 text-sm">Ask your question</p>
                <div className="flex items-center gap-x-4 mt-3">
                    <input 
                        type="text"
                        className="border rounded-sm text-sm h-8 bg-bg-input w-[60%] px-5 outline-none text-letter"
                        placeholder="Write your question..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        
                    />
                    <button 
                        type="button"
                        className="text-white bg-primary px-5 p-2 rounded-sm"
                        onClick={addComment}
                    >
                        <Send size={16}/>
                    </button>
                </div>
            </div>

            <div className="h-3 flex flex-start mb-2 mt-3">
                {message && <Alert message={message} error={error}/>}
            </div>

            <div className="mt-5 bg-gray-100 px-5 py-3">
                {arrayComments.length === 0 ? (
                    <p className="text-letter">Not comments</p>
                ) : (
                    arrayComments.map((c) => (
                        <div key={c.id} className="text-secundary">
                            <p>{c.comment}</p>
                        </div>
                    ))
                )}

                
            </div>
        </section>

        <section className="md:w-[40%] xl:w-[35%]">
            <div className="md:sticky top-1">

                <div className="border rounded p-5">
                    <div className="flex justify-between items-center">
                        <h3 className="text-xl font-semibold text-letter-2">
                            {products.title}
                        </h3>

                        <Heart size={24} color="#FF495C" fill={heart} 
                            onClick={() => setHeart(heart === 'none' ? '#FF495C' : 'none')}
                        />
                    </div>

                    <div className="mt-5">
                        <p className="text-xl text-letter-2">USD {resetMoney(products.price)}</p>
                    </div>

                    <div className="mt-1 flex justify-between items-center">
                        <p className="flex">
                            {generateStar(products.rating, <Star size={16} color="gold" fill="gold"/>)}
                        </p>
                        <p className="text-success">{products.discount}%</p>
                    </div>

                    <div className="mt-1">
                        <p className="text-sm text-success">{products.freeShipping === true ? 'Free Shipping' : 'Discount: none'}</p>
                    </div>

                    {/*Add cart */}
                    <div className="flex items-center mt-5">
                        <button 
                            type="button"
                            onClick={() => setQuantity(Number(quantity - 1))}
                            className="border rounded-full px-2 py-2 hover:bg-slate-100"
                        >
                            <Minus size={15} color="#1574FF"/>
                        </button>

                        <p className="w-[3rem] text-center font-semibold">
                            {checkInSctock(quantity, products.stock)}
                        </p>

                        <button 
                            type="button"
                            onClick={() => setQuantity(Number(quantity + 1))}
                            className="border rounded-full px-2 py-2 hover:bg-slate-100"
                        >
                            <Plus size={15} color="#1574FF"/>
                        </button>
                    </div>

                    <div className="mt-5 flex flex-col gap-2 text-sm">
                        <p className="text-letter">Color:{' '} 
                            <span className="text-letter font-semibold">{products.color}</span>
                        </p>
                        <p className="text-letter">Stock:{' '} 
                            <span className="text-letter font-semibold">{products.stock}</span>
                        </p>
                    </div>

                    <button 
                        type="button"
                        onClick={() => addToCart(products)}
                        className="text-white text-sm bg-primary w-full mt-5 h-8 rounded-sm hover:bg-blue-600"
                    >
                        Add to card
                    </button>
                </div>

                {/**TOTAL */}
                <div className="border rounded p-5 mt-5">
                    <div className="flex flex-col gap-2 text-sm text-letter-2">
                        <p className="font-bold">Subtotal:{' '}  
                            <span className="font-normal">{resetMoney(subtotal)}</span>
                        </p>
                        <p className="font-bold">Discount:{' '}  
                            <span className="text-success font-normal">{products.discount}%</span>
                        </p>
                        <p className="text-lg font-bold">Total:{' '} 
                            <span className="font-normal"> {resetMoney(total)}</span>
                        </p>
                    
                    </div>
                </div>
            </div>

        </section>
    </>
  )
}
