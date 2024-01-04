'use client'
import { usePathname } from 'next/navigation'
import Image from "next/image"
import Link from "next/link"
import {ShoppingBag, ShoppingCart, Heart, User, HelpCircle, CreditCard} from 'react-feather'

export default function MenuUser() {
    const pathName = usePathname()
  return (
    <>
        <div 
            className="sticky top-0 sm:max-w-[18rem] w-full p-5 sm:p-0"
        >
            
            <div className="bg-white sm:max-w-xs sm:h-screen sm:rounded-r-lg rounded-xl sm:shadow border sm:border-none" >
                <div className="px-3 py-5">
                    <div className="mb-6">
                        <Link 
                            href='/'
                            className="flex justify-center mt-5 mb-8"
                            
                        >
                            <Image
                                src="/smart-logo.svg"
                                width={120}
                                height={130}
                                alt="Logo"
                                 
                            />
                        </Link>
                    </div>

                    <div>
                        <ul className="grid grid-cols-3 sm:grid-cols-1 gap-3">
                            <li className={`${pathName === '/user' ? 'bg-fondo-list text-primary underline ' : 'text-txt-5E hover:text-primary hover:underline bg-fondo-list sm:bg-white py-2' } mx-5 px-2 sm:py-1 sm:rounded sm:hover:bg-fondo-list sm:bg-white sm:justify-start rounded-full flex justify-center`}>
                                <Link
                                    href='/user'
                                    className="flex items-center gap-3"
                                >
                                    <User/>
                                    <p className="font-semibold text-base hidden sm:block">Account</p>
                                </Link>
                            </li>

                            <li className={`${pathName === '/user/shopping' ? 'bg-fondo-list text-primary underline ' : 'text-txt-5E hover:text-primary hover:underline bg-fondo-list py-2' } mx-5 px-2 sm:py-1 sm:rounded sm:hover:bg-fondo-list sm:bg-white sm:justify-start rounded-full flex justify-center`}>
                                <Link
                                    href='/user/shopping'
                                    className="flex items-center gap-3"
                                >
                                    <ShoppingBag/>
                                    <p className="font-semibold text-base hidden sm:block">My Shopping</p>
                                </Link>
                            </li>

                            <ul className="hidden sm:grid grid-cols-1 gap-2">
                                <li 
                                    className={`${pathName === '/user/shopping/history' ? 'bg-blue-50 underline text-primary ' : 'text-slate-400 hover:underline bg-slate-50'} ml-10 mr-5 px-7 py-1 rounded `}
                                >
                                    <Link
                                        href='/user/shopping/history'
                                        className="font-semibold text-base"
                                    >
                                        History
                                    </Link>
                                </li>

                                
                            </ul>


                            <li className={`${pathName === '/user/cart' ? 'bg-fondo-list text-primary underline ' : 'text-txt-5E hover:text-primary hover:underline bg-fondo-list sm:bg-white py-2' } mx-5 px-2 sm:py-1 sm:rounded sm:hover:bg-fondo-list sm:bg-white sm:justify-start rounded-full flex justify-center`}>
                                <Link
                                    href='/user/cart'
                                    className="flex items-center gap-3"
                                >
                                    <ShoppingCart/>
                                    <p className="font-semibold text-base hidden sm:block">Cart</p>
                                </Link>
                            </li>

                            <li className={`${pathName === '/user/payments' ? 'bg-fondo-list text-primary underline ' : 'text-txt-5E hover:text-primary hover:underline bg-fondo-list sm:bg-white py-2' } mx-5 px-2 sm:py-1 sm:rounded sm:hover:bg-fondo-list sm:bg-white sm:justify-start rounded-full flex justify-center`}>
                                <Link
                                    href='/user/payments'
                                    className="flex items-center gap-3"
                                >
                                    <CreditCard/>
                                    <p className="font-semibold text-base hidden sm:block">Payments</p>
                                </Link>
                            </li>


                            <li className={`${pathName === '/user/help' ? 'bg-fondo-list text-primary underline ' : 'text-txt-5E hover:text-primary hover:underline bg-fondo-list sm:bg-white py-2' } mx-5 px-2 sm:py-1 sm:rounded sm:hover:bg-fondo-list sm:bg-white sm:justify-start rounded-full flex justify-center`}>
                                <Link
                                    href='/user/help'
                                    className="flex items-center gap-3"
                                >
                                    <HelpCircle/>
                                    <p className="font-semibold text-base hidden sm:block">Help</p>
                                </Link>
                            </li>

                            


                        </ul>

                        
                        
                    </div>
                </div>


            </div>
        </div>
    </>
  )
}
