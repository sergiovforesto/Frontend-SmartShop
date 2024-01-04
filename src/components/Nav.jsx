'use client'
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import Cart from "./Cart"
import Categories from "./CategoriesList"
import Menu from "./Menu"
import axiosInstance from "./axiosInstance"
import useAuthContext from "@/app/hooks/useAuthContext"
import useCartContext from "@/app/hooks/useCartContext"
import Spinner from "./Spinner"
import {Menu as MenuIcon, Search, User, LogOut, Settings} from 'react-feather'



export default function Nav() {
    const router = useRouter()
    const {cerrarSesionAuth} = useAuthContext()
    const {setCart} = useCartContext()
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState([])
    const [active, setActive] = useState(false)
    const [open, setOpen] = useState(false)

    const loadingEvent = () => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            setUser([])
            router.refresh()
        },3000)
    }
    const handleSesion = () => {
        loadingEvent()
        cerrarSesionAuth()
        localStorage.removeItem('token')
        localStorage.removeItem('products')
        setCart([])
    }
    
    
    
    useEffect(() => {
        const getUser = async () => {
            const token = localStorage.getItem("token")
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


                const {data} = await axiosInstance('/users/info-user', axiosConfig)
                setUser({
                    ...data,
                    name: data.name,
                    lastName: data.lastName
                })

            } catch (error) {
                console.log(error)
            }
            

        }
        getUser()
    }, [])


  return (

    <>  
        <nav className="fixed z-10 w-full">
            <Menu 
                open={open}
                setOpen={setOpen}
            />
        </nav>
        
        <header className="bg-white px-2 md:px-8 py-3 flex justify-between items-center shadow-sm sticky top-0 w-full">
            
            <div className="flex items-center md:gap-8 mr-4">
                <button
                    className="cursor-pointer"
                    type="button"
                    onClick={() => setOpen(!open)}
                >
                    
                    <MenuIcon className="text-txt-5E"/>
                    
                </button>
                <div className="hidden md:block">
                    <Link href='/' className="cursor-pointer">
                        <Image 
                            src="/smart-logo.svg"
                            width={120}
                            height={130}
                            alt="smartshop logo"
                            className="w-auto h-auto max-w-[120px]"
                        />
                    </Link>
                </div>
            </div>
            
            {/*Search */}
            <div className="w-1/2 shrink md:w-1/3">
                <div className="border-2 rounded flex">
                    <input 
                        type="text" 
                        placeholder="Search product..."
                        className=" outline-none w-full bg-bg-input text-sm pl-2"
                        

                    />
                    <button 
                        type="button"
                        className=" border-l p-2 sm:p-3 hover:bg-slate-100"
                    >
                        <Search className="h-4 text-txt-5E"/>
                    </button>
                </div>
            </div>


            <div className="flex items-center gap-5 ml-4 grow sm:grow-0">
                <nav className="flex items-center gap-5">
                    {!user?.name && (
                        <>
                            <Link
                                href='/auth/login'
                                className="hidden md:block border-2 border-solid border-primary rounded text-primary hover:border-blue-100 hover:bg-blue-50 hover:text-primary text-sm font-semibold px-3 md:px-4 py-1"
                            >
                                Login
                            </Link>

                            <Link
                                href='/auth'
                                className="hidden md:block border-2 border-solid border-primary rounded text-white bg-primary hover:bg-blue-600 hover:border-blue-600 font-semibold text-sm px-3 md:px-4 py-1"
                            >
                                Register
                            </Link>
                        </>
                    )}
                    {user?.name && (
                        <>  
                            <div className="hidden sm:block ">
                                <Categories/>
                            </div>
                        </>

                    )}

                    
                    
                </nav>
                
                {/*Card and WishList*/}
                <div className="flex items-center gap-5 grow">
                    
                    <div className="relative p-1">
                        <Cart />
                    </div>
                    
                    {/*Button - Log out*/}
                    <div>
                        <div className="border border-neutral-300 bg-slate-100 p-2 rounded-full hover:bg-slate-200">
                            {!user.name ? (
                                <User className="sm:h-5 sm:w-5 text-gray-500"/>
                            ) : (
                                <div className="px-1 rounded-full relative">
                                    <button 
                                        type="button"
                                        className="text-base text-primary font-semibold"
                                        onClick={() => setActive(!active)}
                                    >
                                        {user.name.at(0) + user.lastName.at(0)}
                                    </button>

                                    <div
                                        className={`${active ? 'absolute -left-16' : 'hidden'}`}
                                    >
                                        <ul 
                                            className=" bg-white mt-6 w-[8rem] shadow py-4 rounded-md"
                                            onMouseLeave={() => setActive(!active)}
                                        >
                                            <li className="w-full pl-4 mb-2">
                                                <button
                                                    type="button"
                                                    className="text-sm flex gap-1 items-center text-letter-2 hover:text-primary"
                                                    onClick={()=> handleSesion()}
                                                >   
                                                    {loading ? (
                                                        <div className="flex justify-center items-center w-[6rem]">

                                                            <Spinner/>
                                                        </div>
                                                    ): (
                                                        <>
                                                            <p>Sign out</p>
                                                            <LogOut className="h-4"/>
                                                        </>
                                                    )}
                                                </button>
                                            </li>

                                            {user.role === 'admin' && (
                                                
                                                <li className="w-full pl-4 border-t">
                                                    <Link
                                                        href='/admin'
                                                        className="text-sm flex gap-1 items-center text-letter-2 hover:text-primary mt-2"
                                                    >
                                                        Admin
                                                        <Settings className="h-4"/>
                                                    </Link>
                                                </li>
                                            )}
                                        </ul>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </header>
    </>
  )
}
