import { useState } from "react"
import Link from "next/link"
import {X, User, ShoppingCart, ShoppingBag, Heart, CreditCard, HelpCircle, ChevronDown} from 'react-feather'


export default function Menu({open, setOpen}) {
    const [active, setActive] = useState(false)
  return (
    <>
    <div 
        className={`${open ? 'sticky top-0 z-10 w-full h-screen' : ' hidden'}`}
    >
            <div 
                className="bg-letter-2 bg-opacity-30 animate-opacity-bgBlack"
            >
                <div className="bg-white max-w-xs h-screen rounded-r-lg shadow animate-w-effect" >
                    <div className="p-5">
                        <div className="mb-6">
                            <button 
                                type="button"
                                className="hover:bg-slate-100 rounded-full p-1"
                                onClick={() => setOpen(!open)}
                                
                            >
                                <X  className=" text-txt-5E"/>
                            </button>
                        </div>

                        <div>
                            <ul className="grid grid-cols-1 gap-3">
                                <li className="mx-5 px-2 py-1 rounded-r hover:bg-fondo-list hover:border-l-2 border-primary text-txt-5E hover:text-primary">
                                    <Link
                                        href='/user'
                                        className="flex items-center gap-3" 
                                    >
                                        <User/>
                                        <p className="font-semibold text-base">Account</p>
                                    </Link>
                                </li>

                                <li className="mx-5 px-2 py-1 rounded-r hover:bg-fondo-list hover:border-l-2 border-primary text-txt-5E hover:text-primary">
                                    <Link
                                        href='/user/shopping'
                                        className="flex items-center gap-3"
                                    >
                                        <ShoppingBag/>
                                        <p className="font-semibold text-base">My shopping</p>
                                    </Link>
                                </li>

                                <li className="mx-5 px-2 py-1 rounded-r hover:bg-fondo-list hover:border-l-2 border-primary text-txt-5E hover:text-primary">
                                    <Link
                                        href='/user/cart'
                                        className="flex items-center gap-3"
                                    >
                                        <ShoppingCart/>
                                        <p className="font-semibold text-base">Cart</p>
                                    </Link>
                                </li>

                                

                                <li className="mx-5 px-2 py-1 rounded-r hover:bg-fondo-list hover:border-l-2 border-primary text-txt-5E hover:text-primary">
                                    <Link
                                        href='/user/payments'
                                        className="flex items-center gap-3"
                                    >
                                        <CreditCard/>
                                        <p className="font-semibold text-base ">Payment Method</p>
                                    </Link>
                                </li>

                                <li className="mx-5 px-2 py-1 rounded-r hover:bg-fondo-list hover:border-l-2 border-primary text-txt-5E hover:text-primary">
                                    <Link
                                        href='user/help'
                                        className="flex items-center gap-3"
                                    >
                                        <HelpCircle/>
                                        <p className="font-semibold text-base">Help</p>
                                    </Link>
                                </li>

                            </ul>

                            <hr  className="mt-5 invisible"/>

                            <div className="mx-5 px-2 mt-5">
                                <div 
                                    className="flex items-center gap-1 text-txt-5E font-semibold cursor-pointer"
                                    onClick={() => setActive(!active)}
                                >
                                    <p>Categories</p>
                                    <ChevronDown className={`${active ? 'transition rotate-180 ' : ' rotate-0'}`}/>

                                </div>

                                <ul 
                                    className={`${active ? 'grid grid-cols-1 items-center gap-2 mt-4' : 'hidden'}`}
                                >
                                    <li className="px-2 py-1 rounded-r hover:bg-fondo-list hover:border-l-2 border-primary">
                                        <Link
                                            href=''
                                            className="hover:text-primary text-txt-5E"
                                        >
                                            Computer
                                        </Link>
                                    </li>

                                    <li className="px-2 py-1 rounded-r hover:bg-fondo-list hover:border-l-2 border-primary">
                                        <Link
                                            href=''
                                            className="hover:text-primary text-txt-5E"
                                        >
                                            Mobile
                                        </Link>
                                    </li>

                                    <li className="px-2 py-1 rounded-r hover:bg-fondo-list hover:border-l-2 border-primary">
                                        <Link
                                            href=''
                                            className="hover:text-primary text-txt-5E"
                                        >
                                            Watch
                                        </Link>
                                    </li>

                                    <li className="px-2 py-1 rounded-r hover:bg-fondo-list hover:border-l-2 border-primary">
                                        <Link
                                            href=''
                                            className="hover:text-primary text-txt-5E"
                                        >
                                            Gaming
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
