'use client'
import axiosInstance from "@/components/axiosInstance"
import { useState, useEffect, createContext } from "react"
import { resetMoney } from "@/helpers/resetMoney"


const CartContext = createContext()

const CartProvider = ({children}) => {

    const [total, setTotal] = useState(0)
    const [subtotal, setSubTotal] = useState(0)
    const [quantity, setQuantity] = useState(1)
    const [cart, setCart] = useState([])

    

    if(quantity < 1) return setQuantity(1)

    useEffect(() => {
        if (typeof localStorage !== "undefined") {
          setCart(JSON.parse(localStorage.getItem("products")) ?? []);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('products', JSON.stringify(cart))
        sessionStorage.setItem('SesionProducts', JSON.stringify(cart))
    }, [cart])


    //View Product
    const totalAmount = (quantity, price, discount) => {
        const total = quantity * price;
        const discountAmount = total * discount / 100;
        return setTotal(total - discountAmount);
    }

    const subTotalAmount = (quantity, price) => {
        return setSubTotal(quantity * price)
    }

    function subTotalToPay(cart) {
        const calculateSubTotal = cart.reduce((subTotal, product) => {
            const price = Number(product.price)
            const quantity = product.quantity
            
            return subTotal + (quantity * price)
        }, 0);

        return calculateSubTotal
    }

    function totalToPay(cart) {

        const calculateTotal = cart.reduce((total, product) => {
            const price = Number(product.price);
            const quantity = product.quantity;
            const subTotal = quantity * price;
            const discount = product.discount
            const discountAmount = subTotal * discount / 100;
            
            return total + (subTotal - discountAmount)
            
        }, 0);

        return calculateTotal
    }

    
    
    const addToCart = async(product) => {

        let fullName;

        const token = localStorage.getItem('token')
        if(!token) {
            alert('Please, register o login to buy')
            return
        }

        const axiosConfig = {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            }
        }

        try {
            const user = await axiosInstance('/users/info-user', axiosConfig)
            fullName = user.data.name + ' ' + user.data.lastName
        } catch (error) {
            console.log(error)
        }
        
        const existingProduct = cart.find(p => p.productId === product.id);

        if(existingProduct) {
            existingProduct.quantity = quantity;
            existingProduct.subTotal = resetMoney(subtotal)
            existingProduct.total = resetMoney(total)
            existingProduct.userName = fullName
            setCart([...cart]);
            
        }else {

            const objProduct = {
                productId: product.id,
                image: product.imageUrl,
                name: product.title,
                userName: fullName,
                price: product.price,
                discount: product.discount,
                color: product.color,
                quantity: quantity,
                subTotal: resetMoney(subtotal),
                total: resetMoney(total)
                
            }
            setCart([...cart, objProduct])

        }
        

        setQuantity(1)
        setSubTotal(0)
        setTotal(0)

        // new Promise((resolve) => {
        //     setTimeout(() => {
        //       resolve(
        //         router.push('/user/cart')
        //       )
        //     }, 200)
        // })
    }

    
    
    return (
        <CartContext.Provider 
            value={{
                cart, setCart,
                quantity, setQuantity,
                addToCart,
                total, totalAmount,
                subtotal, subTotalAmount,
                subTotalToPay, totalToPay
                
                
            }}
        >
            {children}
        </CartContext.Provider>
    )
    
}

export {
    CartProvider
}

export default CartContext